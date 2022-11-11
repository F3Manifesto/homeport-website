import type { NextPage } from "next";
import Head from "next/head";
import lodash from "lodash";
import Image from "next/legacy/image";

const Home: NextPage = () => {
  return (
    <div className="relative w-full h-full grid grid-flow-col auto-cols-[auto auto] pt-20 pb-40 gap-10">
      <Head>
        <title>DMS</title>
        <meta name="description" content="DMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-full h-full row-start-1 grid grid-flow-col auto-cols-[auto auto]">
        <div className="relative w-fit h-full col-start-1 grid grid-flow-col auto-cols-[auto auto] place-self-center gap-36">
          <div className="relative w-[30vw] h-fit self-start col-start-1 grid grid-flow-row auto-rows-[auto auto] place-self-center gap-2">
            <div className="relative w-fit text-sm h-fit row-start-1 text-left text-white font-libB">
              A BUNCH OF TEXT GOES HERE TO DESCRIBE THE GIST OF THE SITE ITS
              FEEL, ETC… Made to reflect on the persistence of source materials.
              In the aftermath of trades won and fortunes lost. The perpetual
              hunt for resources beyond the small games of highrise hopes.
              <br />
              <br />A new kind of market player emerges in the balance of
              technical self sovereignty and coherence of the craft.
              Availability limited to those who remember, not your keys means to
              seize your repeat of the GFC.
            </div>
            <div className="relative w-fit h-fit row-start-2 pt-16 font-animosaR text-white pb-6">
              DROP TYPE
            </div>
            <div className="relative w-fit h-fit row-start-3 font-animosaR text-white">
              Patterns
            </div>
            <div className="relative w-fit h-fit row-start-4 font-animosaR text-white">
              Concept Art
            </div>
            <div className="relative w-fit h-fit row-start-5 font-animosaR text-white">
              Glyphs
            </div>
            <div className="relative w-fit h-fit row-start-6 font-animosaR text-white">
              Free Expression
            </div>
            <div className="relative w-fit h-fit row-start-7 font-animosaR text-white">
              Abstract
            </div>
            <div className="relative w-fit h-fit row-start-8 font-animosaR text-white">
              Visual Fiction
            </div>
            <div className="relative w-fit h-fit row-start-9 font-animosaR text-white">
              Retro Instructional
            </div>
            <div className="relative w-fit h-fit row-start-10 font-animosaR text-white">
              Nostalgia
            </div>
            <div className="relative w-fit h-fit row-start-11 font-animosaR text-white">
              Lo - Fi Moods
            </div>
            <div className="relative w-fit h-fit row-start-12 font-animosaR text-white">
              New & Daring
            </div>
            <div className="relative w-fit h-fit row-start-13 font-animosaR text-white py-10">
              Boutique IRL
            </div>
            <div className="relative w-fit h-fit row-start-14 font-animosaR text-white">
              DROP FORMAT
            </div>
            <div className="relative w-fit h-fit row-start-15 font-animosaR text-white">
              Poster
            </div>
            <div className="relative w-fit h-fit row-start-16 font-animosaR text-white">
              Shirt
            </div>
            <div className="relative w-fit h-fit row-start-17 font-animosaR text-white">
              Hoodie
            </div>
            <div className="relative w-fit h-fit row-start-18 font-animosaR text-white">
              Sticker Pack
            </div>
            <div className="relative w-fit h-fit row-start-19 font-animosaR text-white">
              Backpack
            </div>
            <div className="relative w-fit h-fit row-start-20 font-animosaR text-white">
              Shoes
            </div>
            <div className="relative w-fit h-fit row-start-21 font-animosaR text-white">
              Jacket
            </div>
            <div className="relative w-fit h-fit row-start-22 font-animosaR text-white">
              Tote Bag
            </div>
            <div className="relative w-fit h-fit row-start-23 font-animosaR text-white">
              Art Canvas
            </div>
            <div className="relative w-fit h-fit row-start-24 font-animosaR text-white">
              Game Assets
            </div>
            <div className="relative w-fit h-fit row-start-25 font-animosaR text-white">
              Record Cover
            </div>
            <div className="relative w-fit h-fit row-start-26 font-animosaR text-white">
              Zine
            </div>
          </div>
        </div>
        <div className="relative w-full h-full col-start-2 grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative w-[40vw] h-[78vw] bg-grayBlue rounded-lg justify-self-center">
            <Image 
            layout="fill"
            objectFit="cover"
            src="/images/main.png"
            />
          </div>
        </div>
      </div>
      <div className="relative w-full h-full row-start-2 grid grid-flow-col auto-cols-[auto auto] pt-3">
        <div className="relative w-fit h-full text-[11rem] leading-tight text-white font-libR whitespace-nowrap overflow-x-hidden place-self-center">
          SUPPLY FOR ONE
        </div>
      </div>
      <div className="relative w-full h-full row-start-3 grid grid-flow-col auto-cols-[auto auto] pt-3 grid-cols-3 grid gap-3">
        {lodash.range(9).map((index: number) => {
          return <div key={index} className="relative w-60 h-60 bg-grayBlue">

          </div>;
        })}
      </div>
    </div>
  );
};

export default Home;
