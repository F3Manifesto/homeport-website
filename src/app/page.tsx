import { Suspense } from "react";
import { getDictionary } from "./[lang]/dictionaries";
import Entry from "./components/Common/modules/Entry";
import Wrapper from "./components/Common/modules/Wrapper";
import RouterChange from "./components/Common/modules/RouterChange";
import { Metadata } from "next";
import { LOCALES } from "./lib/constants";

export const metadata: Metadata = {
  title: "F3Manifesto by Emma-Jane MacKinnon-Lee",
  metadataBase: new URL("https://f3manifesto.xyz/"),
  description:
    "Transcendent nostalgia. Machine & human made. In with gen. AI, web3 fashion & cc0 before it was cool. زن، زندگی، آزادی",
  alternates: {
    canonical: `https://f3manifesto.xyz/`,
    languages: LOCALES.reduce((acc, item) => {
      acc[item] = `https://f3manifesto.xyz/${item}/`;
      return acc;
    }, {} as { [key: string]: string }),
  },
  twitter: {
    creator: "@f3manifesto",
    site: "@f3manifesto",
    card: "summary_large_image",
    title: "F3Manifesto by Emma-Jane MacKinnon-Lee",
    description:
      "Transcendent nostalgia. Machine & human made. In with gen. AI, web3 fashion & cc0 before it was cool. زن، زندگی، آزادی",
  },
  openGraph: {
    title: "F3Manifesto by Emma-Jane MacKinnon-Lee",
    description:
      "Transcendent nostalgia. Machine & human made. In with gen. AI, web3 fashion & cc0 before it was cool. زن، زندگی، آزادی",
  },
  creator: "Emma-Jane MacKinnon-Lee",
  publisher: "Emma-Jane MacKinnon-Lee",
  keywords: [
    "Web3",
    "Web3 Fashion",
    "Moda Web3",
    "Open Source",
    "CC0",
    "CC0 Web3 Fashion",
    "Emma-Jane MacKinnon-Lee",
    "Open Source LLMs",
    "DIGITALAX",
    "F3Manifesto",
    "Indie Web3 Fashion",
    "digitalax",
    "f3manifesto",
    "Women",
    "Life",
    "Freedom",
  ],
};

export default async function Home() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return (
    <Wrapper
      dict={dict}
      page={
        <Suspense fallback={<RouterChange />}>
          <Entry dict={dict} lang={"en"} />
        </Suspense>
      }
    />
  );
}
