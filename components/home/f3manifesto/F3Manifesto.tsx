import Image from "next/image";
import { FunctionComponent } from "react";
import useF3Manifesto from "./hooks/useF3Manifesto";
import { motion } from "framer-motion";
import Link from "next/link";

const F3Manifesto: FunctionComponent = (): JSX.Element => {
  const { newImages, refreshImages, viewMainImage, mainImage } =
    useF3Manifesto();
  return (
    <div className="w-full h-auto min-h-auto relative flex cursor-empireA">
      <div className="w-4/5 bg-offWhite h-[85vh] relative left-0">
        <div className="font-emiken w-full text-9xl h-fit absolute left-6 top-4">
          F<sub className="font-atmos text-6xl">3</sub> MANIFESTO
        </div>
        <div className="h-1/2 w-1/2 relative top-40">
          <div
            className="h-10 w-full mb-4 relative cursor-empireS hover:opacity-70 bg-lightYellow active:bg-lightYellow active:mix-blend-color-burn"
            onClick={viewMainImage}
          >
            <Image
              objectFit="cover"
              layout="fill"
              src={`/images/tiers/${newImages && newImages[0]}.png`}
            />
          </div>
          <div
            className="h-10 w-10/12 mb-4 relative cursor-empireS hover:opacity-70 bg-lightYellow active:bg-lightYellow active:mix-blend-color-burn"
            onClick={viewMainImage}
          >
            <Image
              objectFit="cover"
              layout="fill"
              src={`/images/tiers/${newImages && newImages[1]}.png`}
            />
          </div>
          <div
            className="h-10 w-8/12 mb-4 relative cursor-empireS hover:opacity-70 bg-lightYellow active:bg-lightYellow active:mix-blend-color-burn"
            onClick={viewMainImage}
          >
            <Image
              objectFit="cover"
              layout="fill"
              src={`/images/tiers/${newImages && newImages[2]}.png`}
            />
          </div>
          <div
            className="h-10 w-6/12 mb-4 relative cursor-empireS hover:opacity-70 bg-lightYellow active:bg-lightYellow active:mix-blend-color-burn"
            onClick={viewMainImage}
          >
            <Image
              objectFit="cover"
              layout="fill"
              src={`/images/tiers/${newImages && newImages[3]}.png`}
            />
          </div>
          <div
            className="h-10 w-4/12 mb-4 relative cursor-empireS hover:opacity-70 bg-lightYellow active:bg-lightYellow active:mix-blend-color-burn"
            onClick={viewMainImage}
          >
            <Image
              objectFit="cover"
              layout="fill"
              src={`/images/tiers/${newImages && newImages[4]}.png`}
            />
          </div>
        </div>
        <div className="font-glitch w-72 h-fit absolute flex flex-col bottom-0 left-20 text-lg leading-tight cursor-empireS">
          More is more. The sensitivity of Monet & the informative load of El
          Bosco.
          <br />
          <br />
          I'm Angello Torres, I was born in Peru and studied graphic design at
          the University of Buenos
        </div>
        <div className="w-1/2 h-5/6 absolute top-40 right-0">
          <motion.div
            whileHover={{
              rotate: 360,
            }}
            onClick={refreshImages}
            className="absolute top-1/3 -left-20 cursor-empireS active:mix-blend-overlay"
          >
            <Image width={60} height={60} src="/images/disk.png" />
          </motion.div>
          <div className="absolute h-fit w-fit font-alber rotate-90 left-16 top-7">
            100% CC0
          </div>
          <div className="absolute h-fit w-fit font-alber rotate-90 left-4 bottom-40">
            CYPHERPUNKS WRITE PROMPTS
          </div>
          <div
            className="w-5/6 h-5/6 absolute flex flex-col bg-black right-0 cursor-empireS"
            id="#mainimage"
          >
            <Image
              priority
              src={`/images/tiers/main${mainImage}.png`}
              layout="fill"
              objectPosition={"top"}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className="w-2/12 bg-gradient-to-r from-grad1 via-grad2 to-grad3 h-full absolute right-0 border-2 border-borderBlue">
        <div className="relative text-lightYellow font-fira text-xs whitespace-nowrap">
          01000001 01001001 00100000 01100110 01101111 01110010{" "}
        </div>
        <div className="absolute bottom-0 text-lightYellow font-fira text-xs whitespace-nowrap rotate-180">
          01000001 01001001 00100000 01100110 01101111 01110010{" "}
        </div>
        <div className="relative w-full grid grid-cols-3 grid-flow-row top-9">
          <div className="relative h-full w-full flex justify-center align-center cursor-empireS hover:rotate-12">
            <Link href="https://digitalax.xyz">
              <a target="_blank" rel="noreferrer" className="cursor-empireS">
                <Image width={50} height={50} src="/images/digi.png" />
              </a>
            </Link>
          </div>
          <div className="relative h-full w-full flex justify-center align-center cursor-empireS hover:rotate-12">
            <Link href="https://inarisynth.xyz">
              <a target="_blank" rel="noreferrer" className="cursor-empireS">
                <Image width={50} height={50} src="/images/inari.png" />
              </a>
            </Link>
          </div>
          <div className="relative h-full w-full flex justify-center align-center cursor-empireS hover:rotate-12">
            <Link href="https://diysynth.xyz">
              <a target="_blank" rel="noreferrer" className="cursor-empireS">
                <Image width={50} height={50} src="/images/diy.png" />
              </a>
            </Link>
          </div>
        </div>
        <div className="relative w-full h-fit top-14">
          <div className="absolute left-10 w-fit h-fit">
            <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xs mb-2">
              68 73 89
            </div>
            <div className="relative top-2 -left-6 font-fira text-darkP text-xs">
              01
            </div>
            <div className="relative -top-4 left-1 font-fira text-darkP text-md">
              D.I.Y <br /> <b className="font-firaB">Brutalism</b>
            </div>
            <div className="relative -right-32 -top-20 hover:rotate-45">
              <Image src="/images/wheel.png" width={50} height={50} />
            </div>
          </div>
          <div className="absolute w-fit h-fit left-10 top-48">
            <div className="relative right-6 -top-20 hover:rotate-45">
              <Image src="/images/player.png" width={65} height={50} />
            </div>
            <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xs -right-20 -top-40 mb-2">
              100 105 103 105
            </div>
            <div className="absolute font-fira text-darkP left-16 bottom-44 text-xs">
              02
            </div>
            <div className="relative -top-40 left-24 font-fira text-darkP text-md -right-28">
              Digicore
              <br /> <b className="font-firaB">Patchwork</b>
            </div>
          </div>
          <div className="absolute left-10 w-fit h-fit top-48">
            <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xs mb-2 -left-4">
              118 105 110 116
            </div>
            <div className="relative top-2 -left-6 font-fira text-darkP text-xs">
              03
            </div>
            <div className="relative -top-4 left-1 font-fira text-darkP text-md">
              Vintage <br /> <b className="font-firaB">Americana</b>
            </div>
            <div className="relative -right-28 -top-20 hover:rotate-45">
              <Image src="/images/flag.png" width={65} height={50} />
            </div>
          </div>
          <div className="absolute w-fit h-fit left-10 top-96 ">
            <div className="relative right-6 -top-20 hover:rotate-45">
              <Image src="/images/fox.png" width={75} height={60} />
            </div>
            <div className="relative border border-offWhite text-darkP font-firaL w-fit h-fit p-1 text-xs -right-28 -top-40 mb-2">
              119 101 98
            </div>
            <div className="absolute font-fira text-darkP left-16 bottom-44 text-xs">
              04
            </div>
            <div className="relative -top-40 left-24 font-fira text-darkP text-md -right-28">
              Cottagecore
              <br /> <b className="font-firaB">Web Kitsch</b>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 leading-snug w-fit h-fit p-1 text-xs font-firaL text-center inline-flex align-center justify-center">
          MICROFACTORY CO-OPs <br />
          <br />
          VIRTUAL, LATENT & IRL SPACE Chapter 0001 - NYC Edition
        </div>
      </div>
    </div>
  );
};

export default F3Manifesto;
