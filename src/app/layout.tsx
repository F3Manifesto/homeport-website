import { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";


export const metadata: Metadata = {
  title: "F3Manifesto",
  metadataBase: new URL("https://f3manifesto.xyz"),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
