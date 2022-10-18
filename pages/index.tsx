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
import { useRef } from "react";

const Home: NextPage = (): JSX.Element => {
  const shopping = useRef<null | HTMLDivElement>(null);
  const goShopping = (): void => {
    shopping.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="cursor" className="min-h-[500vw] md:min-h-fit">
      <Head>
        <title>F3Manifesto</title>
        <meta name="description" content="CC0 Web3 Fashion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VintageFilm />
      <F3Manifesto />
      <Web3Fashion goShopping={goShopping} />
      <Collections shopping={shopping} />
      <Poster />
      <Clear />
      <Slider />
      <Gap />
    </div>
  );
};

export default Home;
