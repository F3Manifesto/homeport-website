import { Profile } from "../../graphql/generated";
import getPublication from "../../graphql/lens/queries/publication";
import { Gallery } from "../../types/general.types";
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
