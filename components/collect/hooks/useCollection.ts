import { useEffect, useState } from "react";
import { Gallery } from "../../../types/general.types";
import { getOneCollection } from "../../../graphql/subgraph/queries/getCollections";
import handleCollectionProfilesAndPublications from "../../../lib/helpers/handleCollectionProfilesAndPublications";
import { Profile } from "../../../graphql/generated";

const useCollection = (name: string, lensConnected: Profile | undefined) => {
  const [collectionLoading, setCollectionLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<Gallery>();

  const getCollection = async () => {
    setCollectionLoading(true);
    try {
      const data = await getOneCollection(name?.replaceAll("-", " "));
      const coll = await handleCollectionProfilesAndPublications(
        (data as any)?.data?.collectionCreateds,
        lensConnected
      );

      setCollection(coll?.[0]);
    } catch (err: any) {
      console.error(err.message);
    }
    setCollectionLoading(false);
  };

  useEffect(() => {
    if (name && !collection) {
      getCollection();
    }
  }, [name]);
  return {
    collection,
    collectionLoading,
    setCollection,
  };
};

export default useCollection;
