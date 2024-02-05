import { Gallery } from "../../components/Home/types/home.types";
import { Profile } from "../../graphql/generated";
import getPublication from "../../graphql/lens/queries/publication";
import collectionFixer from "./collectionFixer";
import toHexWithLeadingZero from "./leadingZero";

const handleCollectionProfilesAndPublications = async (
  collections: Gallery[],
  lens: Profile | undefined
): Promise<Gallery[] | undefined> => {
  try {
    const promises = collections?.map(async (collection: Gallery) => {
      if (collection?.profileId && collection?.pubId) {
        const publication = await getPublication(
          {
            forId: `${toHexWithLeadingZero(
              Number(collection?.profileId)
            )}-${toHexWithLeadingZero(Number(collection?.pubId))}`,
          },
          lens?.id
        );

        const coll = await collectionFixer(collection);
        return {
          ...coll,
          profile: publication?.data?.publication?.by as Profile,
          publication: publication?.data?.publication,
          prices: coll?.prices?.map((price: string) =>
            String(Number(price) / 10 ** 18)
          ),
          access:
            typeof coll?.collectionMetadata?.access === "string"
              ? (coll?.collectionMetadata?.access as any)
                  ?.split(",")
                  ?.map((word: string) => word.trim())
                  ?.filter((word: string) => word.length > 0)
              : coll?.collectionMetadata?.access,
          tags:
            typeof coll?.collectionMetadata?.tags === "string"
              ? (coll?.collectionMetadata?.tags as any)
                  ?.split(",")
                  ?.map((word: string) => word.trim())
                  ?.filter((word: string) => word.length > 0)
              : coll?.collectionMetadata?.tags,
        } as Gallery;
      }
    });
    const colls = await Promise.all(promises);
    return colls?.filter(Boolean) as Gallery[];
  } catch (err: any) {
    console.error(err.message);
  }
};

export default handleCollectionProfilesAndPublications;
