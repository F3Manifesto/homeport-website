import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

const Custom404: NextPage = (): JSX.Element => {
  return (
    <div className="relative flex items-center justify-center h-screen w-full cursor-empireA">
      <Head>
        <title>Glitch</title>
        <meta name="og:url" content={`https://f3manifesto.xyz/card.png`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-fit h-fit text-lightYellow font-fira p-6 text-center flex items-center justify-center break-all">
        There&apos;s been a glitch in the fabric. Find your way back{" "}
        <Link href="/">
          <a className="hover:opacity-80 cursor-empireS pl-2">{" "}home.</a>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
