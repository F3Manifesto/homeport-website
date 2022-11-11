import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
import Demand from "../components/Home/Demand";
import Featured from "../components/Home/Featured";
import Gallery from "../components/Home/Gallery";
import Grid from "../components/Home/Grid";
import LargeText from "../components/Home/LargeText";
import Prompt from "../components/Home/Prompt";
import {useEffect} from "react"

const Home: NextPage = () => {
  return (
    <div className="relative w-screen max-w-screen h-full grid grid-flow-col auto-cols-[auto auto] pt-20 pb-40 gap-10">
      <Head>
        <title>DMS</title>
        <meta name="description" content="DMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <LargeText />
      <Gallery />
      <Demand />
      <Grid />
      <Prompt />
    </div>
  );
};

export default Home;
