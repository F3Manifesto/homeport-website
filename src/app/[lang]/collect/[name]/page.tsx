import CollectEntry from "@/app/components/Collect/modules/CollectEntry";
import { Metadata } from "next";
import { Gallery } from "@/app/components/Common/types/common.types";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import {
  getAllCollections,
  getOneCollection,
} from "../../../../../graphql/queries/getCollections";
import { getDictionary } from "../../dictionaries";

export async function generateStaticParams() {
  const gallery = await getAllCollections(1000, 0);
  return await Promise.all(
    gallery?.data?.collectionCreateds?.map(async (coll: Gallery) => {
      if (!coll?.metadata && coll?.uri) {
        const json = await fetch(
          `${INFURA_GATEWAY}/ipfs/${coll?.uri?.split("ipfs://")?.[1]}`
        );
        coll.metadata = await json.json();
      }

      return { name: coll?.metadata?.title };
    })
  );
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{
    name: string;
  }>;
}): Promise<Metadata> => {
  const { name } = await params;
  const data = await getOneCollection(
    decodeURIComponent(name)?.replaceAll("-", " ")
  );
  const collection = data?.data?.collectionCreateds?.[0];

  if (!collection?.metadata && collection?.uri) {
    const json = await fetch(
      `${INFURA_GATEWAY}/ipfs/${collection?.uri?.split("ipfs://")?.[1]}`
    );
    collection.metadata = await json.json();
  }

  return {
    title: collection?.metadata?.title,
    description: collection?.metadata?.description,
    openGraph: {
      images: `${INFURA_GATEWAY}/ipfs/${
        collection?.metadata?.images?.[0]?.split("ipfs://")?.[1]
      }`,
    },
  };
};

export default async function Collect({
  params,
}: {
  params: Promise<{
    lang: string;
    name: string;
  }>;
}) {
  const { lang, name } = await params;
  const data = await getOneCollection(
    decodeURIComponent(name)?.replaceAll("-", " ")
  );
  const collection = data?.data?.collectionCreateds?.[0];
  if (!collection?.metadata && collection?.uri) {
    const json = await fetch(
      `${INFURA_GATEWAY}/ipfs/${collection?.uri?.split("ipfs://")?.[1]}`
    );
    collection.metadata = await json.json();
  }

  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <CollectEntry collection={collection} dict={dict} />;
}
