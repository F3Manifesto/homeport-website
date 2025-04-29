import { tParams } from "../layout";
import OrdersEntry from "@/app/components/Orders/modules/OrdersEntry";
import { Metadata } from "next";
import { getDictionary } from "../[lang]/dictionaries";
import Wrapper from "../components/Common/modules/Wrapper";
import { Suspense } from "react";
import RouterChange from "../components/Common/modules/RouterChange";

export const metadata: Metadata = {
  title: "Orders",
  metadataBase: new URL("https://f3manifesto.xyz/orders"),
  description:
    "Transcendent nostalgia. Machine & human made. In with gen. AI, web3 fashion & cc0 before it was cool. زن، زندگی، آزادی",
  twitter: {
    creator: "@f3manifesto",
    site: "@f3manifesto",
    card: "summary_large_image",
    title: "F3Manifesto",
    description:
      "Transcendent nostalgia. Machine & human made. In with gen. AI, web3 fashion & cc0 before it was cool. زن، زندگی، آزادی",
  },
  openGraph: {
    title: "F3Manifesto",
    description:
      "Transcendent nostalgia. Machine & human made. In with gen. AI, web3 fashion & cc0 before it was cool. زن، زندگی، آزادی",
  },
  robots: {
    googleBot: {
      index: true,
      follow: true,
    },
  },
  creator: "Emma-Jane MacKinnon-Lee",
  publisher: "Emma-Jane MacKinnon-Lee",
  keywords: [
    "Web3",
    "Web3 Fashion",
    "Moda Web3",
    "Open Source",
    "CC0",
    "Emma-Jane MacKinnon-Lee",
    "Open Source LLMs",
    "DIGITALAX",
    "F3Manifesto",
    "www.digitalax.xyz",
    "www.f3manifesto.xyz",
    "Women",
    "Life",
    "Freedom",
  ],
};

export default async function Orders({ params }: { params: tParams }) {
  const { lang } = await params;

  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return (
    <Wrapper
      dict={dict}
      page={
        <Suspense fallback={<RouterChange />}>
          <OrdersEntry dict={dict} />
        </Suspense>
      }
    />
  );
}
