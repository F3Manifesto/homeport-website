import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { SmallBoardProps } from "../../../types/general.types";
import PinBoardM from "./PinBoardM";
import { motion } from "framer-motion";
import PinBoardS from "./PinBoardS";

const SmallBoard: FunctionComponent<SmallBoardProps> = ({
  refreshImages,
  mainImage,
  viewMainImage,
  newImages,
}): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true)
  return (
    <div className="relative grid auto-cols-[auto auto] w-full min-h-full h-full">
      <div className="relative grid grid-flow-row auto-rows-[auto auto] max-w-full h-fit">
        <div className="relative row-start-1 col-start-1 w-full h-fit bg-offWhite">
          <div className="relative w-full h-fit grid grid-flow-row auto-rows-[auto auto]">
            <div className="relative row-start-1 w-full h-fit pt-3">
              <div className="font-emiken w-fit text-[10vw] h-fit relative grid auto-cols-[auto auto] grid-flow-col gap-1 pl-3 lg:pr-10 xl:pr-0">
                <div className="relative row-start-1 col-start-1 w-fit h-fit">
                  F
                </div>
                <div className="relative row-start-1 col-start-2 font-atmos text-4xl lg:text-5xl xl:text-6xl self-end justify-start w-fit h-fit">
                  3
                </div>
                <div className="relative row-start-1 col-start-3 w-fit h-fit pl-3">
                  MANIFESTO
                </div>
                <div className="relative row-start-2 alm:row-start-1 col-start-3 alm:col-start-4 alm:pt-0 pt-3 w-fit h-fit justify-self-center self-center pl-12">
                  <motion.div
                    whileHover={{
                      rotate: 360,
                    }}
                    onClick={refreshImages}
                    className="relative cursor-empireS active:mix-blend-overlay"
                  >
                    <Image width={50} height={50} src="/images/disk.png" placeholder="blur" blurDataURL="base64"/>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="relative row-start-2 max-w-full h-fit pt-8">
              <div className="min-h-full h-fit relative grid auto-rows-[auto auto] grid-flow-row gap-4 w-fit min-w-full w-full overflow-hidden">
                {newImages &&
                  newImages.map((image: string, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`h-10 w-full relative cursor-empireS hover:opacity-70 bg-lightYellow active:bg-lightYellow active:mix-blend-color-burn row-start-${
                          index + 1
                        } ${blur && "blur-sm"}`}
                        onClick={viewMainImage}
                      >
                        <Image
                          objectFit="cover"
                          layout="fill"
                          width={768}
                          height={512}
                          src={`/images/tiers/${image}.png`}
                          placeholder="blur"
                          blurDataURL="base64"
                          onLoadingComplete={() => setBlur(false)}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="relative row-start-3 w-full h-fit pt-14">
              <div className="relative grid grid-flow-col auto-cols-[auto auto] w-full h-fit">
                <div className="relative col-start-1 w-fit h-fit self-end row-start-2 alm:row-start-1 pt-20">
                  <p className="font-glitch w-fit h-fit relative inline-table flex-col text-base md:text-lg leading-tight cursor-empireS">
                    Like most things in glass dial simulacra
                    <span className="font-air">,</span>
                    their appeal comes from appearance, status, and material
                    use.
                    <br />
                    <br />
                    In worlds run by interfaces
                    <span className="font-air">,</span> machine code
                    <span className="font-air">,</span> and whimsy<span>,</span>
                  </p>
                </div>
                <div className="relative row-start-1 col-start-1 alm:col-start-2 w-fit h-fit place-self-center alm:place-self-end">
                  <div className="relative grid grid-flow-col auto-cols-[auto auto]">
                    <div className="relative col-start-1 w-fit h-full">
                      <div className="grid relative grid-flow-row auto-rows-[auto auto] w-10 h-full min-h-full justify-between content-between pt-4 pr-6 w-fit">
                        <div className="row-start-1 w-fit h-full">
                          <div className="relative h-fit w-fit font-alber rotate-90 whitespace-nowrap">
                            100% CC0
                          </div>
                        </div>
                        <div className="relative row-start-2 w-fit h-full">
                          <div className="relative h-fit w-fit font-alber rotate-90 whitespace-nowrap right-11 bottom-20">
                            CYPHERPUNKS WRITE PROMPTS
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative col-start-2 w-fit h-fit">
                      <div
                        className="alm:w-[40vw] alm:h-[40vw] w-[80vw] h-[80vw] relative flex flex-col bg-black cursor-empireS shrink-0"
                        id="#mainimage"
                      >
                        <Image
                          priority
                          src={`/images/tiers/main${mainImage}.png`}
                          layout="fill"
                          objectPosition={"top"}
                          objectFit="cover"
                          width={800}
                          height={800}
                          placeholder="blur"
                          blurDataURL="base64"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative col-start-1 row-start-2 h-[7vw] alm:h-[4vw] w-full bg-offBlack flex"></div>
        <div>
          <div className="relative col-start-1 row-start-3 h-full min-w-full w-full place-self-end hidden alm:flex">
            <PinBoardM />
          </div>
          <div className="relative col-start-1 row-start-3 h-full min-w-full w-full place-self-end flex alm:hidden">
            <PinBoardS />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallBoard;
