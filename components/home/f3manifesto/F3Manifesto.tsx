import Image from "next/image";
import { FunctionComponent } from "react";
import useF3Manifesto from "./hooks/useF3Manifesto";
import { motion } from "framer-motion";
import PinBoard from "./PinBoard";

const F3Manifesto: FunctionComponent = (): JSX.Element => {
  const { newImages, refreshImages, viewMainImage, mainImage } =
    useF3Manifesto();
  return (
    <div className="w-full h-[85vh] min-h-[85vh] relative flex cursor-empireA clear-both">
      <div className="relative grid auto-cols-[auto auto] w-full">
      <div className="w-4/5 bg-offWhite min-h-[85vh] h-[85vvh] relative left-0 col-start-1">
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
            className="w-5/6 h-5/6 absolute flex flex-col bg-black right-0 cursor-empireS shrink-0"
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
      </div>
     
     <PinBoard />
    </div>
  );
};

export default F3Manifesto;
