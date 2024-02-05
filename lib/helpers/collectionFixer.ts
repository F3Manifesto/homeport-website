import { Gallery } from "../../components/Home/types/home.types";
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

  return coll;
};

export default collectionFixer;
