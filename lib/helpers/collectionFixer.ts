import { Gallery } from "../../types/general.types";
import fetchIPFSJSON from "./fetchIpfsJson";

const collectionFixer = async (collection: Gallery): Promise<Gallery> => {
  let ipfs = {};
  if (!collection?.collectionMetadata?.title && collection?.pubId) {
    let data = await fetchIPFSJSON(collection?.uri);
    const { cover, ...rest } = data;
    ipfs = {
      collectionMetadata: {
        ...rest,
        mediaCover: rest?.cover,
      },
    };
  }
  const coll = {
    ...collection,
    ...ipfs,
  };

  return {
    ...coll,
    collectionMetadata: {
      ...coll?.collectionMetadata,
      tags:
        typeof coll?.collectionMetadata?.tags === "string"
          ? (coll?.collectionMetadata?.tags as any)
              ?.split(",")
              ?.map((word: string) => word.trim())
              ?.filter((word: string) => word.length > 0)
          : coll?.collectionMetadata?.tags,
    },
    prices: coll?.prices?.map((price: string) =>
      String(Number(price) / 10 ** 18)
    ),
  } as Gallery;
};

export default collectionFixer;
