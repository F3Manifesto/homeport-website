import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { motion } from "framer-motion";
import PinBoard from "./PinBoard";
import { MainBoardProps } from "../../../types/general.types";
import { INFURA_GATEWAY } from "../../../lib/constants";

const MainBoard: FunctionComponent<MainBoardProps> = ({
  refreshImages,
  mainImage,
  setMainImage,
  newImagesURI,
  goShopping,
  filterURL,
  filterConstants,
}): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);
  return (
    <div className="relative flex flex-row xl:flex-nowrap flex-wrap w-full min-h-full h-full">
      <div className="w-full h-auto bg-offWhite relative grid grid-flow-row auto-rows-auto">
        <div className="font-emiken w-fit text-[8vw] xl:text-[9vw] h-fit relative grid auto-cols-auto grid-flow-col gap-1 pl-3 lg:pr-10 xl:pr-0">
          <div className="relative col-start-1 w-fit h-fit">F</div>
          <div className="relative col-start-2 font-atmos text-lg galaxy:text-4xl lg:text-5xl xl:text-6xl wide:text-9xl self-end justify-start w-fit h-fit">
            3
          </div>
          <div className="relative col-start-3 w-fit h-fit pl-3">MANIFESTO</div>
        </div>
        <div className="flex flex-col md:flex-row h-fit w-full relative pt-3">
          <div className="relative flex flex-col w-full h-full grid-flow-row">
            <div className="h-full relative flex flex-col gap-4 w-full">
              {newImagesURI?.map((uri: string, index: number) => {
                return (
                  <div
                    key={index}
                    className={`h-10 relative cursor-empireS hover:opacity-70 bg-lightYellow active:bg-lightYellow active:mix-blend-color-burn ${
                      (index === 0 && "w-full") ||
                      (index === 1 && "w-10/12") ||
                      (index === 2 && "w-8/12") ||
                      (index === 3 && "w-6/12") ||
                      (index === 4 && "w-4/12")
                    } ${blur && "animate-unblur blur-sm"}`}
                    onClick={() => setMainImage(uri)}
                  >
                    <Image
                      objectFit="cover"
                      onLoadingComplete={() => setBlur(false)}
                      layout="fill"
                      draggable={false}
                      src={`${INFURA_GATEWAY}/ipfs/${uri}`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="relative w-fit h-fit pt-16">
              <p className="font-glitch w-full md:w-96 xl:w-72 h-fit relative inline-table flex-col text-sm sm:text-base md:text-lg leading-tight cursor-empireS left-0 half:left-20 break-word">
                Like most things in glass dial simulacra
                <span className="font-air">,</span>
                their appeal comes from appearance
                <span className="font-air">,</span> status
                <span className="font-air">,</span> and material use.
                <br />
                <br />
                In worlds run by interfaces
                <span className="font-air">,</span> machine code
                <span className="font-air">,</span> and whimsy<span>.</span>
              </p>
            </div>
          </div>
          <div className="w-[7rem] h-[7rem] xl:w-[5rem] xl:h-[5rem] relative place-self-center grid grid-flow-col auto-cols-auto z-10">
            <motion.div
              whileHover={{
                rotate: 360,
              }}
              onClick={refreshImages}
              className={`relative cursor-empireS active:mix-blend-overlay place-self-center top-auto md:pt-0 pt-8 md:-top-20 xl:top-auto pr-0 midi:pr-3 xl:pr-0 ${
                blur && "animate-unblur blur-sm w-full h-full"
              }`}
            >
              <Image
                width={60}
                height={60}
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/QmWcaVfpqyRB2BQ9swPHBB85fBTQSjQgoh4LNt1tWTXPmU`}
                onLoadingComplete={() => setBlur(false)}
                className="relative w-full h-full"
              />
            </motion.div>
          </div>
          <div className="relative w-full h-full flex flex-col xl:flex-row items-end justify-end xl:gap-0 gap-10">
            <div className="relative w-fit h-fit xl:h-[30vw] pt-4 pr-6 flex flex-col xl:right-[11vw] items-end xl:items-between xl:justify-between">
              <div className="relative xl:absolute h-full w-fit font-alber xl:rotate-90 whitespace-nowrap flex xl:top-[7vw] xl:right-[6vw]">
                100% CC0
              </div>
              <div className="relative xl:absolute h-full w-fit font-alber xl:rotate-90 whitespace-nowrap xl:right-[3vw] flex xl:bottom-[10vw]">
                CYPHERPUNKS WRITE PROMPTS
              </div>
            </div>
            <div className="relative w-full md:w-[40vw] h-[80vw] md:h-[40vw] xl:h-[40vw] xl:w-[30vw] grid grid-flow-col auto-cols-auto items-end">
              <div
                className={`w-full h-full relative bg-black cursor-empireS place-self-end ${
                  blur && "blur-sm animate-unblur"
                }`}
                id="#mainimage"
              >
                <Image
                  priority
                  draggable={false}
                  src={`${INFURA_GATEWAY}/ipfs/${mainImage}`}
                  layout="fill"
                  objectPosition={"top"}
                  objectFit="cover"
                  onLoadingComplete={() => setBlur(false)}
                  className="relative w-full h-full flex"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative col-start-2 h-full w-[4vw] bg-offBlack"></div>
      <PinBoard
        filterConstants={filterConstants}
        goShopping={goShopping}
        filterURL={filterURL}
      />
    </div>
  );
};

export default MainBoard;
