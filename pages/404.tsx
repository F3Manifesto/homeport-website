import { NextPage } from "next";
import Link from "next/link";
import Sidebar from "../components/layout/Sidebar";
import Head from "next/head";

const Custom404: NextPage = (): JSX.Element => {
  return (
    <div className="relative min-h-screen min-w-screen h-screen w-screen grid grid-flow-col auto-cols-auto cursor-empireA">
      <Head>
        <title>Glitch</title>
        <meta name="og:url" content={`https://f3manifesto.xyz/card.png`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <div className="relative w-fit h-fit place-self-center text-lightYellow font-fira p-6 text-center">
        There&apos;s been a glitch in the fabric. Find your way back{" "}
        <Link href="/">
          <a className="hover:opacity-80 cursor-empireS">home.</a>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
