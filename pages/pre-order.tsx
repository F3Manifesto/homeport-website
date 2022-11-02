import type { NextPage } from "next";
import { AiFillBackward } from "react-icons/ai";
import Link from "next/link";
import Form from "../components/preorders/Form";
import Sidebar from "../components/layout/Sidebar";
import { useContext } from "react";
import { GlobalContext } from "./_app";
import Head from "next/head";

const PreOrder: NextPage = (): JSX.Element => {
  const { order } = useContext(GlobalContext);
  return (
    <div className="flex min-h-screen h-fit min-w-screen bg-black relative cursor-empire selection:bg-lightYellow selection:text-lightYellow bg-offBlack cursor-empireA">
      <Head>
        <title>Pre-Order IRL</title>
        <meta name="og:url" content="https://f3manifesto.xyz/pre-order" />
        <meta name="og:title" content="Pre-Order IRL" />
        <meta name="og:description" content="Pre-0rder Item IRL" />
        <meta name="og:image" content="https://f3manifesto.xyz/card.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="og:url" content="https://f3manifesto.xyz/pre-order" />
        <meta name="og:image" content="https://f3manifesto.xyz/pre-order" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@f3manifesto" />
        <meta name="twitter:creator" content="@f3manifesto" />
        <meta
          name="twitter:image"
          content="https://f3manifesto.xyz/pre-order"
        />
        <meta name="twitter:url" content="https://f3manifesto.xyz/pre-order" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="canonical" href="https://f3manifesto.xyz/pre-order" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <div className="flex flex-col w-full flex-auto h-full min-h-full">
        <Sidebar />
        <div className="relative grid auto-rows-[auto auto] grid-flow-row w-full h-fit gap-3 justify-center">
          <Link href={"/#shopping"}>
            <div className="text-offWhite font-fira left-7 self-center pt-8 pl-6 place-self-start h-fit w-fit top-7 opacity-80 hover:opacity-20 cursor-empireS row-start-1">
              <AiFillBackward
                color="#F2F2F2"
                size={25}
                className="float-left mr-2"
              />{" "}
              Return
            </div>
          </Link>
          <div className="relative row-start-2 h-fit w-fit justify-center pt-20 pl-20 pr-8">
            <div className="text-offWhite font-firaB text-3xl leading-relaxed">
              Thank you for expressing interest in more of <br />
              this item being made IRL.
            </div>
          </div>
          <div className="relative row-start-3 h-fit w-fit justify-center pl-20">
            <div className="font-fira text-base text-offWhite leading-snug relative w-[70%]">
              Before we commit to a new limited run, each of you who take the
              time to tell us a bit about what you want goes a long way in our
              decision of what to work on.
            </div>
          </div>
          <div className="relative row-start-4 h-fit w-fit justify-center pl-20 pt-10 pr-8 pb-20">
            {order !== "" ? (
              <Form />
            ) : (
              <Link href={"/#shopping"}>
                <div className="relative text-offWhite font-fira text-lg cursor-empireS hover:text-lightYellow h-fit w-fit">
                  Please Select the Outfit you'd like to pre-order.
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrder;
