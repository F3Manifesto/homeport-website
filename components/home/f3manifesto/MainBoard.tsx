import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { motion } from "framer-motion";
import PinBoard from "./PinBoard";
import PinBoardM from "./PinBoardM";
import { MainBoardProps } from "../../../types/general.types";

const MainBoard: FunctionComponent<MainBoardProps> = ({
  refreshImages,
  mainImage,
  viewMainImage,
  newImages,
}): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);
  return (
    <div className="relative grid auto-cols-[auto auto] w-full min-h-full h-full">
      <div className="w-full midi:w-fit min-h-full bg-offWhite relative left-0 col-start-1 row-start-1">
        <div className="font-emiken w-fit text-[8vw] xl:text-[9vw] h-fit relative grid auto-cols-[auto auto] grid-flow-col gap-1 pl-3 lg:pr-10 xl:pr-0">
          <div className="relative col-start-1 w-fit h-fit">F</div>
          <div className="relative col-start-2 font-atmos text-4xl lg:text-5xl xl:text-6xl self-end justify-start w-fit h-fit">
            3
          </div>
          <div className="relative col-start-3 w-fit h-fit pl-3">MANIFESTO</div>
        </div>
        <div className="grid auto-cols-[auto auto] h-fit max-w-full min-w-full justify-between content-between w-full grid-flow-col relative pt-3 justify-between">
          <div className="relative grid auto-rows-[auto auto] w-full h-full grid-flow-row col-start-1 col-span-7">
            <div className="relative row-start-1 w-full h-full">
              <div className="min-h-full h-fit relative grid auto-rows-[auto auto] grid-flow-row gap-4 w-full min-w-full">
                {newImages &&
                  newImages.map((image: string, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`h-10 relative cursor-empireS hover:opacity-70 bg-lightYellow active:bg-lightYellow active:mix-blend-color-burn row-start-${
                          index + 1
                        } ${
                          (index === 0 && "w-full") ||
                          (index === 1 && "w-10/12") ||
                          (index === 2 && "w-8/12") ||
                          (index === 3 && "w-6/12") ||
                          (index === 4 && "w-4/12")
                        } ${blur && "animate-unblur blur-sm"}`}
                        onClick={viewMainImage}
                      >
                        <Image
                          objectFit="cover"
                          placeholder="blur"
                          blurDataURL="base64"
                          onLoadingComplete={() => setBlur(false)}
                          layout="fill"
                          width={768}
                          height={512}
                          src={`/images/tiers/${image}.png`}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="relative row-start-2 w-fit h-fit pt-16 pl-20">
              <p className="font-glitch w-96 xl:w-72 h-fit relative inline-table flex-col text-base md:text-lg leading-tight cursor-empireS">
                Like most things in glass dial simulacra
                <span className="font-air">,</span>
                their appeal comes from appearance, status, and material use.
                <br />
                <br />
                In worlds run by interfaces
                <span className="font-air">,</span> machine code
                <span className="font-air">,</span> and whimsy<span>,</span>
              </p>
            </div>
          </div>
          <div className="w-[5vw] h-[5vw] relative col-start-8 col-span-1 place-self-center">
            <motion.div
              whileHover={{
                rotate: 360,
              }}
              onClick={refreshImages}
              className={`relative cursor-empireS active:mix-blend-overlay -top-28  lg:-top-20 xl:top-auto midi:pr-3 xl:pr-0 ${blur && "animate-unblur blur-sm"}`}
            >
              <Image
                width={60}
                height={60}
                placeholder="blur"
                blurDataURL="base64"
                src="/images/disk.png"
                onLoadingComplete={() => setBlur(false)}
              />
            </motion.div>
          </div>
          <div className="relative col-start-9 col-span-4 w-full h-full">
            <div className="relative grid grid-flow-col auto-cols-[auto auto]">
              <div className="relative col-start-1 w-fit h-full col-span-1">
                <div className="grid relative grid-flow-row auto-rows-[auto auto] w-10 h-full min-h-full justify-between content-between pt-4 pr-6 w-fit">
                  <div className="row-start-1 w-fit h-full">
                    <div className="relative h-fit w-fit font-alber rotate-90 whitespace-nowrap">
                      100% CC0
                    </div>
                  </div>
                  <div className="relative row-start-2 w-fit h-full">
                    <div className="relative h-fit w-fit font-alber rotate-90 whitespace-nowrap right-11 bottom-14">
                      CYPHERPUNKS WRITE PROMPTS
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative col-start-2 col-span-3 w-fit h-fit place-self-end row-start-1">
                <div className="relative w-fit h-full w-fit h-fit">
                  <div
                    className={`w-[30vw] h-[30vw] relative flex flex-col bg-black cursor-empireS shrink-0 ${
                      blur && "blur-sm animate-unblur"
                    }`}
                    id="#mainimage"
                  >
                    <Image
                      priority
                      placeholder="blur"
                      blurDataURL="base64"
                      src={`/images/tiers/main${mainImage}.png`}
                      layout="fill"
                      objectPosition={"top"}
                      objectFit="cover"
                      width={800}
                      height={800}
                      onLoadingComplete={() => setBlur(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative col-start-2 h-full w-[4vw] bg-offBlack hidden midi:flex"></div>
      <div className="relative col-start-1 row-start-2 h-[4vw] min-w-full w-full place-self-end midi:hidden flex"></div>
      <div className="relative col-start-3 row-start-1 h-full min-w-fit w-fit place-self-end hidden midi:flex">
        <PinBoard />
      </div>
      <div>
        <div className="relative col-start-1 row-start-3 h-full min-w-full w-full place-self-end midi:hidden flex">
          <PinBoardM />
        </div>
      </div>
    </div>
  );
};

export default MainBoard;
