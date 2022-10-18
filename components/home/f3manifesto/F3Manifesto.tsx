import Image from "next/image";
import { FunctionComponent } from "react";
import useF3Manifesto from "./hooks/useF3Manifesto";
import { motion } from "framer-motion";
import PinBoard from "./PinBoard";

const F3Manifesto: FunctionComponent = (): JSX.Element => {
  const { newImages, refreshImages, viewMainImage, mainImage } =
    useF3Manifesto();
  const widthArray: string[] = ["full", "10/12", "8/12", "6/12", "4/12"];
  return (
    <div className="w-full h-auto min-h-full relative flex flex-col cursor-empireA clear-both">
      <div className="relative grid auto-cols-[auto auto] w-full min-h-auto h-auto">
        <div className="w-[74vw] xl:w-4/5 bg-offWhite min-h-[85vh] h-[85vvh] relative left-0 col-start-1">
          <div className="font-emiken w-fit text-[8vw] xl:text-[9vw] h-fit relative grid auto-cols-[auto auto] grid-flow-col gap-1 pt-1 pl-3">
            <div className="relative col-start-1 w-fit h-fit">F</div>
            <div className="relative col-start-2 font-atmos lg:text-5xl xl:text-6xl self-end justify-start w-fit h-fit">
              3
            </div>
            <div className="relative col-start-3 w-fit h-fit pl-3">
              MANIFESTO
            </div>
          </div>
          <div className="grid auto-cols-[auto auto] h-4/6 w-full grid-flow-col relative">
            <div className="h-fit w-full relative grid auto-rows-[auto auto] grid-flow-row gap-4 col-start-1">
              {newImages &&
                newImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className={`h-10 w-${
                        widthArray[index]
                      } relative cursor-empireS hover:opacity-70 bg-lightYellow active:bg-lightYellow active:mix-blend-color-burn row-start-${
                        index + 1
                      }`}
                      onClick={viewMainImage}
                    >
                      <Image
                        objectFit="cover"
                        layout="fill"
                        src={`/images/tiers/${image}.png`}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="w-fit h-fit relative col-start-2 place-self-center">
              <motion.div
                whileHover={{
                  rotate: 360,
                }}
                onClick={refreshImages}
                className="relative cursor-empireS active:mix-blend-overlay"
              >
                <Image width={60} height={60} src="/images/disk.png" />
              </motion.div>
            </div>
            <div className="relative col-start-3 w-full h-full">
              <div className="relative grid-flow-row auto-rows-[auto auto] flex">
                <div className="absolute h-fit w-fit font-alber rotate-90 row-start-1">
                  100% CC0
                </div>
                <div className="absolute h-fit w-fit font-alber rotate-90 row-start-2">
                  CYPHERPUNKS WRITE PROMPTS
                </div>
              </div>
              <div
                className="w-full h-full absolute flex flex-col bg-black right-0 cursor-empireS shrink-0"
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

          <div className="font-glitch w-72 h-fit absolute flex flex-col bottom-0 left-20 text-lg leading-tight cursor-empireS">
            More is more. The sensitivity of Monet & the informative load of El
            Bosco.
            <br />
            <br />
            I'm Angello Torres, I was born in Peru and studied graphic design at
            the University of Buenos
          </div>
        </div>
      </div>

      <PinBoard />
    </div>
  );
};

export default F3Manifesto;
