"use client";

import Head from "next/head";
import Link from "next/link";

export default function NotFoundEntry({ dict }: { dict: any }) {
  return (
    <div className="relative flex items-center justify-center h-screen w-full cursor-empireA">
      <Head>
        <title>Glitch</title>
        <meta name="og:url" content={`https://f3manifesto.xyz/card.png`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-fit h-fit text-lightYellow font-fira p-6 text-center flex items-center justify-center break-all">
        {`${dict?.[404]?.glitch} `} <Link href="/"> {dict?.[404]?.home}</Link>
      </div>
    </div>
  );
}
