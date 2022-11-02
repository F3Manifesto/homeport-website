import type { NextPage } from "next";
import Head from "next/head";
import VintageFilm from "../components/home/video/VintageFilm";
import F3Manifesto from "../components/home/f3manifesto/F3Manifesto";
import Web3Fashion from "../components/home/web3fashion/Web3Fashion";
import Collections from "../components/home/collections/Collections";
import Poster from "../components/home/poster/Poster";
import Clear from "../components/home/clear/Clear";
import Slider from "../components/home/slider/Slider";
import Gap from "../components/home/gap/Gap";
import { useContext, useRef } from "react";
import { GlobalContext } from "./_app";

const Home: NextPage = (): JSX.Element => {
  const shopping = useRef<null | HTMLDivElement>(null);
  const goShopping = (): void => {
    shopping.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { setOrder } = useContext(GlobalContext);

  return (
    <div
      id="cursor"
      className="flex flex-col midWhite bg-offBlack h-full min-w-screen"
    >
      <Head>
        <title>F3Manifesto</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:site_name" content="F3M" />
        <meta property="og:image" content="https://f3manifesto.xyz/card.png/" />
        <meta property="og:type" content="website" />
        <meta name="og:url" content="https://f3manifesto.xyz/" />
        <meta name="og:title" content="F3Manifesto" />
        <meta name="og:description" content="I Want My Web3 Fashion" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@f3manifesto" />
        <meta name="twitter:creator" content="@f3manifesto" />
        <meta
          name="twitter:image"
          content="https://f3manifesto.xyz/card.png/"
        />
        <meta name="twitter:url" content="https://f3manifesto.xyz/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="canonical" href="https://f3manifesto.xyz/" />
      </Head>

      <VintageFilm />
      <F3Manifesto />

      <Web3Fashion goShopping={goShopping} />
      <Collections shopping={shopping} setOrder={setOrder} />
      <Poster />
      <Clear />
      <Slider />
      <Gap />
    </div>
  );
};

export default Home;
