import { Suspense } from "react";
import { getDictionary } from "./[lang]/dictionaries";
import Entry from "./components/Common/modules/Entry";
import Wrapper from "./components/Common/modules/Wrapper";
import RouterChange from "./components/Common/modules/RouterChange";
import { Metadata } from "next";
import { LOCALES, INFURA_GATEWAY, BOARD_IMAGES, MARQUEE_IMAGES } from "./lib/constants";

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "F3Manifesto by Emma-Jane MacKinnon-Lee",
            description:
              "Transcendent nostalgia. Machine & human made. In with gen. AI, web3 fashion & cc0 before it was cool. Web3 fashion gallery and CC0 creative work.",
            url: "https://f3manifesto.xyz/",
            creator: {
              "@type": "Person",
              "@id": "https://emmajanemackinnonlee.com/#person",
              name: "Emma-Jane MacKinnon-Lee",
              url: "https://emmajanemackinnonlee.com/",
            },
            image: [
              ...BOARD_IMAGES.map((cid: string) => ({
                "@type": "ImageObject",
                contentUrl: `${INFURA_GATEWAY}/ipfs/${cid}`,
                name: "F3Manifesto Web3 Fashion Image",
                description: "Web3 fashion and CC0 creative work by Emma-Jane MacKinnon-Lee",
                creator: {
                  "@type": "Person",
                  name: "Emma-Jane MacKinnon-Lee",
                },
                license: "https://creativecommons.org/publicdomain/zero/1.0/",
              })),
              ...MARQUEE_IMAGES.map((cid: string) => ({
                "@type": "ImageObject",
                contentUrl: `${INFURA_GATEWAY}/ipfs/${cid}`,
                name: "F3Manifesto Web3 Fashion Image",
                description: "Web3 fashion and CC0 creative work by Emma-Jane MacKinnon-Lee",
                creator: {
                  "@type": "Person",
                  name: "Emma-Jane MacKinnon-Lee",
                },
                license: "https://creativecommons.org/publicdomain/zero/1.0/",
              })),
              {
                "@type": "ImageObject",
                contentUrl: `${INFURA_GATEWAY}/ipfs/QmeNFvYW5eWDBwFgCkpiU6PY18oabkBuj56iDcr1ZU9AY9`,
                name: "F3Manifesto Web3 Fashion Hero Image",
                description: "Web3 fashion and CC0 creative work by Emma-Jane MacKinnon-Lee",
                creator: {
                  "@type": "Person",
                  name: "Emma-Jane MacKinnon-Lee",
                },
                license: "https://creativecommons.org/publicdomain/zero/1.0/",
              },
              {
                "@type": "ImageObject",
                contentUrl: `${INFURA_GATEWAY}/ipfs/QmQdKuK1f2VmEBoXr7nWr9dEjZo4B2WSRoUs65WxJ5KEzL`,
                name: "F3Manifesto Web3 Fashion Background Image",
                description: "Web3 fashion and CC0 creative work by Emma-Jane MacKinnon-Lee",
                creator: {
                  "@type": "Person",
                  name: "Emma-Jane MacKinnon-Lee",
                },
                license: "https://creativecommons.org/publicdomain/zero/1.0/",
              },
              {
                "@type": "ImageObject",
                contentUrl: `${INFURA_GATEWAY}/ipfs/QmcM8caaAM6Pu7bdiwM6QMkwYJa2hhqsAmJFi8zvZzEQQD`,
                name: "F3Manifesto Web3 Fashion Gallery Image",
                description: "Web3 fashion and CC0 creative work by Emma-Jane MacKinnon-Lee",
                creator: {
                  "@type": "Person",
                  name: "Emma-Jane MacKinnon-Lee",
                },
                license: "https://creativecommons.org/publicdomain/zero/1.0/",
              },
              {
                "@type": "ImageObject",
                contentUrl: `${INFURA_GATEWAY}/ipfs/QmTVMXcjyMNmkMiyUFKxx3iqqdCTMuSpnLCgUS6usLX9Bu`,
                name: "F3Manifesto Web3 Fashion Gallery Image",
                description: "Web3 fashion and CC0 creative work by Emma-Jane MacKinnon-Lee",
                creator: {
                  "@type": "Person",
                  name: "Emma-Jane MacKinnon-Lee",
                },
                license: "https://creativecommons.org/publicdomain/zero/1.0/",
              },
              {
                "@type": "ImageObject",
                contentUrl: `${INFURA_GATEWAY}/ipfs/QmcJm2mBZ1SErHEDYro3yJYyyv8aqnjVCt5s7NbqkkcYpC`,
                name: "F3Manifesto Web3 Fashion Gallery Image",
                description: "Web3 fashion and CC0 creative work by Emma-Jane MacKinnon-Lee",
                creator: {
                  "@type": "Person",
                  name: "Emma-Jane MacKinnon-Lee",
                },
                license: "https://creativecommons.org/publicdomain/zero/1.0/",
              },
            ],
          }),
        }}
      />
      <Wrapper
        dict={dict}
        page={
          <Suspense fallback={<RouterChange />}>
            <Entry dict={dict} lang={"en"} />
          </Suspense>
        }
      />
    </>
  );
}
