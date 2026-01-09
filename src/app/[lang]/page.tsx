import { Suspense } from "react";
import Entry from "../components/Common/modules/Entry";
import { getDictionary } from "./dictionaries";
import { tParams } from "./layout";
import RouterChange from "../components/Common/modules/RouterChange";
import { Metadata } from "next";
import { LOCALES } from "../lib/constants";

export const generateMetadata = async ({
  params,
}: {
  params: tParams;
}): Promise<Metadata> => {
  const { lang } = await params;

  return {
    title: "F3Manifesto by Emma-Jane MacKinnon-Lee",
    metadataBase: new URL("https://f3manifesto.xyz/"),
    description:
      "Transcendent nostalgia. Machine & human made. In with gen. AI, web3 fashion & cc0 before it was cool. زن، زندگی، آزادی",
    keywords: [
      "Web3",
      "Web3 Fashion",
      "Indie Web3 Fashion",
      "Moda Web3",
      "Open Source",
      "CC0",
      "CC0 Web3 Fashion",
      "Emma-Jane MacKinnon-Lee",
      "Open Source LLMs",
      "DIGITALAX",
      "F3Manifesto",
      "digitalax",
      "f3manifesto",
      "Women",
      "Life",
      "Freedom",
    ],
    alternates: {
      canonical: `https://f3manifesto.xyz/${lang}/`,
      languages: LOCALES.reduce((acc, item) => {
        acc[item] = `https://f3manifesto.xyz/${item}/`;
        return acc;
      }, {} as { [key: string]: string }),
    },
    openGraph: {
      title: "F3Manifesto by Emma-Jane MacKinnon-Lee",
      description:
        "Transcendent nostalgia. Machine & human made. In with gen. AI, web3 fashion & cc0 before it was cool. زن، زندگی، آزادی",
    },
  };
};

export default async function Home({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return (
    <Suspense fallback={<RouterChange />} >
      <Entry dict={dict} lang={lang} />
    </Suspense>
  );
}
