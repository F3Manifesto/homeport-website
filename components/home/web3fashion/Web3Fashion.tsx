import Image from "next/image";
import { FunctionComponent, useEffect } from "react";
import { motion } from "framer-motion";
import useWeb3Fashion from "./hooks/useWeb3Fashion";
import { Web3FashionProps } from "./../../../types/general.types";

const Web3Fashion: FunctionComponent<Web3FashionProps> = ({
  goShopping,
}): JSX.Element => {
  const { marqueeVariants, setShowImage, showImage } = useWeb3Fashion();
  const videos: string[] = [
    "ZK CYPHERPUNK",
    "THE NAVIGATORS",
    "OS ENGINEERING",
    "REALMS",
    "UNSPUN",
  ];
  return (
    <div className="w-full min-h-auto h-auto relative flex bg-offBlack">
      <div className="font-glitch w-72 h-fit absolute flex flex-col text-lightYellow text-lg leading-tight cursor-empireA z-10 top-0 left-20">
        Aires. I worked for many years in Branding and Web Design studios as Art
        Director and Lead Designer.
      </div>
      <div className="min-h-auto h-[400vh] bg-offWhite w-full min-w-full top-11 relative z-0 cursor-empireA left-0">
        <motion.div
          onClick={() => goShopping()}
          variants={marqueeVariants}
          animate="animate"
          className="w-fit h-fit absolute top-28 sm:top-10 right-4 z-10 will-change-transform"
        >
          <Image priority src="/images/carts.gif" width={40} height={30} />
        </motion.div>
        <div className="min-h-full h-full absolute w-screen min-w-screen">
          <Image
            priority
            src="/images/mtv2.png"
            objectFit="cover"
            layout="fill"
            width={512}
            height={1280}
          />
        </div>
        <div
          className="absolute w-full justify-center flex h-fit leading-tight top-72 mix-blend-hard-light text-[20vw] md:text-[11rem] text-center align-center p-4"
          id="want"
        >
          I WANT MY <br />
          WEB3
          <br />
          FASHION
        </div>
        <div className="relative top-2/3 grid auto-rows-[auto auto] md:auto-cols-[auto auto] grid-flow-row w-fit left-4 sm:left-20">
          <div className="relative flex border-l-2 border-t-2 border-b-2 border-offWhite h-80 w-20 font-holo rounded-bl-lg rounded-tl-lg row-start-2 md:col-start-1">
            <div className="relative grid auto-rows-[auto auto] grid-flow-row gap-14 justify-items-center w-full -top-3">
              {videos.map((video: string, index: number) => {
                return (
                  <div
                    className={`relative w-fit h-fit row-start-${
                      index + 1
                    } justify-self-start`}
                  >
                    <div className="grid auto-cols-[auto auto] grid-flow-col relative gap-2 h-fit w-fit">
                      <hr
                        className={`w-20 h-0.5 bg-offWhite float-left col-start-1 self-center ${
                          (index === 0 || index === 4) && `invisible`
                        }`}
                      />
                      <div
                        className="relative whitespace-nowrap text-offWhite cursor-empireS hover:text-bright col-start-2"
                        onMouseOver={(e) =>
                          setShowImage((e.target as HTMLElement).innerText)
                        }
                        onMouseLeave={() => setShowImage(undefined)}
                      >
                        {video}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative row-start-1 md:col-start-2">
            {showImage && (
              <div className="absolute rounded-lg h-80 w-72 sm:h-80 sm:w-96 border-4 border-offBlack  md:left-40 md:top-auto left-auto -top-96">
                <video
                  className="object-cover w-full h-full"
                  autoPlay
                  loop
                  muted
                >
                  <source src={`/videos/cyphers/${showImage}.mp4`} />
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web3Fashion;
