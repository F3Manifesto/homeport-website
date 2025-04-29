import CollectEntry from "@/app/components/Collect/modules/CollectEntry";
import {
  getAllCollections,
  getOneCollection,
} from "../../../../graphql/queries/getCollections";
import { Metadata } from "next";
import { Gallery } from "@/app/components/Common/types/common.types";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Wrapper from "@/app/components/Common/modules/Wrapper";
import { Suspense } from "react";
import RouterChange from "@/app/components/Common/modules/RouterChange";

export async function generateStaticParams() {
  const gallery = await getAllCollections(1000, 0);
  return await Promise.all(
    gallery?.data?.collectionCreateds?.map(async (coll: Gallery) => {
      if (!coll?.collectionMetadata && coll?.uri) {
        const json = await fetch(
          `${INFURA_GATEWAY}/ipfs/${coll?.uri?.split("ipfs://")?.[1]}`
        );
        coll.collectionMetadata = await json.json();
      }

      return { name: coll?.collectionMetadata?.title };
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

  if (!collection?.collectionMetadata && collection?.uri) {
    const json = await fetch(
      `${INFURA_GATEWAY}/ipfs/${collection?.uri?.split("ipfs://")?.[1]}`
    );
    collection.collectionMetadata = await json.json();
  }

  return {
    title: collection?.collectionMetadata?.title,
    description: collection?.collectionMetadata?.description,
    openGraph: {
      images: `${INFURA_GATEWAY}/ipfs/${
        collection?.collectionMetadata?.images?.[0]?.split("ipfs://")?.[1]
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
  if (!collection?.collectionMetadata && collection?.uri) {
    const json = await fetch(
      `${INFURA_GATEWAY}/ipfs/${collection?.uri?.split("ipfs://")?.[1]}`
    );
    collection.collectionMetadata = await json.json();
  }

  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);

  return (
    <Wrapper
      dict={dict}
      page={
        <Suspense fallback={<RouterChange />}>
          <CollectEntry collection={collection} dict={dict} />
        </Suspense>
      }
    />
  );
}
