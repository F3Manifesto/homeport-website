import Image from "next/image";
import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import useWeb3Fashion from "./hooks/useWeb3Fashion";
import { Web3FashionProps } from "./../../../types/general.types";

const Web3Fashion: FunctionComponent<Web3FashionProps> = ({
  goShopping,
}): JSX.Element => {
  const { marqueeVariants, setShowImage, showImage } = useWeb3Fashion();
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
          className="w-fit h-fit absolute top-10 right-4 z-10 will-change-transform"
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
          className="absolute w-full justify-center flex h-fit leading-tight top-72 mix-blend-hard-light text-[11rem] text-center align-center"
          id="want"
        >
          I WANT MY <br /> WEB3
          <br /> FASHION
        </div>
        <div className="relative flex border-t-2 border-l-2 border-b-2 border-offWhite top-2/3 h-80 w-20 rounded-lg left-20 font-holo">
          <div className="top-0 absolute w-full">
            <div
              className="left-24 absolute whitespace-nowrap text-offWhite -top-3 cursor-empireS hover:text-bright"
              onMouseOver={(e) =>
                setShowImage((e.target as HTMLElement).innerText)
              }
              onMouseLeave={() => setShowImage(undefined)}
            >
              ZK CYPHERPUNK
            </div>
          </div>
          <div className="top-[4rem] absolute w-full">
            <hr className="w-full h-0.5 bg-offWhite float-left" />
            <div
              className="left-24 absolute whitespace-nowrap text-offWhite -top-3 cursor-empireS hover:text-bright"
              onMouseOver={(e) =>
                setShowImage((e.target as HTMLElement).innerText)
              }
              onMouseLeave={() => setShowImage(undefined)}
            >
              THE NAVIGATORS
            </div>
          </div>
          <div className="top-[8rem] absolute w-full">
            <hr className="w-full h-0.5 bg-offWhite float-left" />
            <div
              className="left-24 absolute whitespace-nowrap text-offWhite -top-3 cursor-empireS hover:text-bright"
              id="OS ENGINEERING"
              onMouseOver={(e) =>
                setShowImage((e.target as HTMLElement).innerText)
              }
              onMouseLeave={() => setShowImage(undefined)}
            >
              OS ENGINEERING
            </div>
          </div>
          <div className="top-[12rem] absolute w-full">
            <hr className="w-full h-0.5 bg-offWhite float-left" />
            <div
              className="left-24 absolute whitespace-nowrap text-offWhite -top-3 cursor-empireS hover:text-bright"
              onMouseOver={(e) =>
                setShowImage((e.target as HTMLElement).innerText)
              }
              onMouseLeave={() => setShowImage(undefined)}
            >
              REALMS
            </div>
          </div>
          <div className="top-[16rem] absolute w-full">
            <hr className="w-full h-0.5 bg-offWhite float-left" />
            <div
              className="left-24 absolute whitespace-nowrap text-offWhite -top-3 cursor-empireS hover:text-bright"
              onMouseOver={(e) =>
                setShowImage((e.target as HTMLElement).innerText)
              }
              onMouseLeave={() => setShowImage(undefined)}
            >
              UNSPUN
            </div>
          </div>
          <div className="top-[20rem] absolute w-full">
            <div
              className="left-24 absolute whitespace-nowrap text-offWhite -top-3 cursor-empireS hover:text-bright"
              onMouseOver={(e) =>
                setShowImage((e.target as HTMLElement).innerText)
              }
              onMouseLeave={() => setShowImage(undefined)}
            >
              SYNTH WAVE
            </div>
          </div>
        </div>
        {showImage && (
          <div className="absolute rounded-lg h-80 w-96 border-4 border-offBlack top-2/3 left-80">
            <video className="object-cover w-full h-full" autoPlay loop muted>
              <source src={`/videos/${showImage}.mp4`} />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Web3Fashion;
