"use client";

import { useContext } from "react";
import RouterChange from "./RouterChange";
import Image from "next/image";
import { INFURA_GATEWAY_INTERNAL, MARQUEE_IMAGES } from "@/app/lib/constants";
import Marquee from "react-fast-marquee";
import useGallery from "../hooks/useGallery";
import { ModalContext } from "@/app/providers";
import Film from "./Film";
import { motion } from "framer-motion";
import Board from "./Board";
import useCommon from "../hooks/useCommon";
import IsekaiSearch from "./IsekaiSearch";
import IsekaiGallery from "./IsekaiGallery";
import Search from "./Search";
import Gallery from "./Gallery";

export default function Entry({ dict, lang }: { dict: any; lang: string }) {
  const context = useContext(ModalContext);
  const {
    filteredGallery,
    filteredIsekaiGallery,
    galleryLoading,
    shopping,
    goShopping,
    handleURL,
  } = useGallery();
  const { videoImage, setVideoImage, message } = useCommon();

  if (!galleryLoading && context?.filters) {
    return (
      <div
        id="cursor"
        className="flex flex-col bg-offBlack h-fit w-full relative justify-start items-center"
      >
        <Film dict={dict} />
        <Board
          lang={lang}
          dict={dict}
          goShopping={goShopping}
          handleURL={handleURL}
        />
        <div className="w-full h-[400vh] items-center justify-center relative flex bg-offBlack overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              priority
              src={`${INFURA_GATEWAY_INTERNAL}QmeNFvYW5eWDBwFgCkpiU6PY18oabkBuj56iDcr1ZU9AY9`}
              objectFit="cover"
              layout="fill"
              draggable={false}
              alt="F3Manifesto by Emma-Jane MacKinnon-Lee"
            />
          </div>
          <div className="absolute w-full h-fit top-4 flex items-center justify-between gap-3 flex-col md:flex-row">
            <div
              className={`w-full md:w-96 xl:w-72 h-fit relative inline-table flex-col text-sm sm:text-base md:text-lg leading-tight cursor-empireS break-word items-center justify-center half:pl-0 half:left-24 text-lightYellow ${
                lang == "ar" ? "font-firaA pr-2" : "font-glitch pl-2"
              }`}
              dir={lang == "ar" ? "rtl" : "ltr"}
            >
              {dict?.common?.looks}
              <em className={`${lang == "ar" ? "font-firaA" : "font-air"}`}>
                ,
              </em>{" "}
              {dict?.common?.elec}
            </div>
            <div className="relative w-28 h-fit flex items-center justify-center mr-0">
              <motion.div
                onClick={() => goShopping()}
                variants={{
                  animate: {
                    x: [-485, 485],
                    transition: {
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                      },
                    },
                  },
                }}
                animate="animate"
                className="w-10 h-8 will-change-transform cursor-empireS"
              >
                <Image
                  priority
                  src={`${INFURA_GATEWAY_INTERNAL}QmNrCdpmAPgqt4rJ5NDPKkuWTZWwLDBpHuR16zug1HDf7h`}
                  layout="fill"
                  draggable={false}
                  alt="F3Manifesto by Emma-Jane MacKinnon-Lee"
                />
              </motion.div>
            </div>
          </div>
          <div
            className={`absolute w-full h-fit justify-center flex leading-tight top-72 mix-blend-hard-light text-[20vw] md:text-[11rem] cursor-empireA text-center items-center p-4 ${
              lang == "ar" ? "font-uk" : "font-air"
            }`}
            id="want"
          >
            {dict?.common?.want} <br />
            {dict?.common?.web3}
            <br />
            {dict?.common?.fash}
          </div>
          <div className="absolute top-2/3 left-2 sm:left-10 w-full h-fit flex flex-row items-center justify-start">
            <div
              className={`relative w-fit h-[25.3rem] flex flex-row items-start justify-center ${
                lang == "ar" ? "font-uni" : "font-holo"
              }`}
            >
              <div className="relative w-fit h-full rounded-l-md border-l-2 border-t-2 border-b-2 border-white flex items-start justify-between flex-col gap-20">
                <div
                  className={`relative w-fit h-fit flex items-start flex-row gap-3 justify-start`}
                >
                  <div
                    className="absolute left-12 sm:left-24 -top-3 whitespace-nowrap text-offWhite cursor-empireS hover:text-bright flex items-center justify-center"
                    onMouseOver={() =>
                      setVideoImage(
                        "QmQs6MHroLcc5ifmUSdcqUbrPa6emwiBCTVajv9Dm9kh16"
                      )
                    }
                    onMouseLeave={() => setVideoImage(undefined)}
                  >
                    ZK CYPHERPUNK
                  </div>
                </div>
                <div className="relative w-fit h-full flex flex-col items-start justify-between gap-6">
                  {[
                    {
                      title: dict?.common?.nav,
                      video: "QmQ8oq5VhKAYQ3iKNtk6SaHiuhw7JfzSHkN46r7QjzioAA",
                    },
                    {
                      title: dict?.common?.eng,
                      video: "QmSqg89NzVqBriAZWHBSZPgNBUaLu9saGMSrMLuGiFB7tG",
                    },
                    {
                      title: dict?.common?.rea,
                      video: "QmdGa6HZGnZEQY3Riix7FYrpvdTcJNz1mGd4c5qEJyjin4",
                    },
                    {
                      title: dict?.common?.un,
                      video: "QmNYRZ5k5R63ZAYQxXzMZexLZ4Fm6ZWGzQAMyecQ5id8Yr",
                    },
                  ].map(
                    (
                      video: { title: string; video: string },
                      index: number
                    ) => {
                      return (
                        <div
                          className={`relative w-fit h-fit flex items-start flex-row gap-3 justify-start`}
                          key={index}
                        >
                          <div
                            className={`relative w-10 sm:w-20 h-0.5 flex items-center justify-center bg-offWhite`}
                          ></div>
                          <div
                            className="absolute left-12 sm:left-24 -top-3 whitespace-nowrap text-offWhite cursor-empireS hover:text-bright flex items-center justify-center"
                            onMouseOver={() => setVideoImage(video.video)}
                            onMouseLeave={() => setVideoImage(undefined)}
                          >
                            {video.title}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
                <div
                  className={`relative w-fit h-fit flex items-start flex-row gap-3 justify-start`}
                >
                  <div
                    className="absolute left-12 sm:left-24 -top-3 whitespace-nowrap text-offWhite cursor-empireS hover:text-bright flex items-center justify-center"
                    onMouseOver={() =>
                      setVideoImage(
                        "QmbSNy3aUmwCzaEutJHDpBMhCy6y75jZEMtwP6KVmz3wVm"
                      )
                    }
                    onMouseLeave={() => setVideoImage(undefined)}
                  >
                    {dict?.common?.synth}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex items-center justify-center w-5/6 left-0 sm:w-fit h-fit md:left-60 md:top-auto -top-96">
              {videoImage && (
                <div className="relative rounded-lg h-80 w-full sm:w-96 border-4 border-offBlack flex items-center justify-center bg-offBlack">
                  <video
                    className="object-cover w-full h-full rounded-lg"
                    autoPlay
                    loop
                    key={videoImage}
                    muted
                  >
                    <source src={`${INFURA_GATEWAY_INTERNAL}${videoImage}`} />
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="w-full h-fit flex items-center justify-center relative flex-col cursor-empireA bg-offWhite pt-2 pb-20 gap-10"
          ref={shopping}
        >
          <div className="w-full h-4 flex items-center justify-center relative bg-grayBlue"></div>
          <Search dict={dict} handleURL={handleURL} />
          <Gallery
            dict={dict}
            filteredGallery={filteredGallery}
            galleryLoading={galleryLoading}
          />
        </div>
        <div className="w-full h-fit flex items-center justify-center relative flex-col cursor-empireA bg-offBlack px-4 pb-14 pt-20 text-white gap-4">
          <div
            className={`relative w-full h-fit break-words text-4xl md:text-6xl ${
              lang == "ar" ? "font-uni" : "font-emiken"
            }`}
            dir={lang == "ar" ? "rtl" : "ltr"}
          >
            {dict?.common?.isekai}
          </div>
          <div
            className={`relative w-full h-fit text-sm preG:text-md md:text-xl ${
              lang == "ar" ? "font-uni" : "font-conso"
            }`}
            dir={lang == "ar" ? "rtl" : "ltr"}
          >
            {dict?.common?.portal}
          </div>
          <IsekaiSearch lang={lang} dict={dict} handleURL={handleURL} />
          <IsekaiGallery
            dict={dict}
            handleURL={handleURL}
            galleryLoading={galleryLoading}
            filteredIsekaiGallery={filteredIsekaiGallery}
          />
        </div>
        <div className="relative w-full h-[275vh] flex bg-offWhite items-center justify-center">
          <div
            className={`w-full h-full relative flex items-center justify-center`}
          >
            <Image
              src={`${INFURA_GATEWAY_INTERNAL}QmQdKuK1f2VmEBoXr7nWr9dEjZo4B2WSRoUs65WxJ5KEzL`}
              priority
              layout="fill"
              objectFit="cover"
              objectPosition={"left"}
              draggable={false}
              alt="F3Manifesto by Emma-Jane MacKinnon-Lee"
            />
          </div>
          <div className="absolute bottom-20 right-5 sm:right-10 grid auto-rows-auto grid-flow-col gap-6">
            <div className="relative col-start-1 md:col-start-2 md:row-start-2 row-start-3 w-fit h-fit">
              <div
                className={`w-40 h-40 galaxy:h-80 galaxy:w-80 border border-lightYellow relative flex items-center justify-center bg-lightYellow`}
              >
                <Image
                  src={`${INFURA_GATEWAY_INTERNAL}QmcM8caaAM6Pu7bdiwM6QMkwYJa2hhqsAmJFi8zvZzEQQD`}
                  priority
                  objectFit="cover"
                  layout="fill"
                  draggable={false}
                  alt="F3Manifesto by Emma-Jane MacKinnon-Lee"
                />
              </div>
            </div>
            <div className="relative col-start-1 row-start-2 w-fit h-fit">
              <div
                className={`w-40 h-40 galaxy:h-80 galaxy:w-80 border border-lightYellow relative flex items-center justify-center`}
              >
                <Image
                  src={`${INFURA_GATEWAY_INTERNAL}QmTVMXcjyMNmkMiyUFKxx3iqqdCTMuSpnLCgUS6usLX9Bu`}
                  priority
                  objectFit="cover"
                  layout="fill"
                  draggable={false}
                  alt="F3Manifesto by Emma-Jane MacKinnon-Lee"
                />
              </div>
            </div>
            <div className="relative col-start-1 md:col-start-2 row-start-1 w-fit h-fit">
              <div
                className={`w-40 h-40 galaxy:h-80 galaxy:w-80 border border-lightYellow relative flex items-center justify-center`}
              >
                <Image
                  src={`${INFURA_GATEWAY_INTERNAL}QmcJm2mBZ1SErHEDYro3yJYyyv8aqnjVCt5s7NbqkkcYpC`}
                  priority
                  alt="F3Manifesto by Emma-Jane MacKinnon-Lee"
                  objectFit="cover"
                  layout="fill"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex w-full h-fit items-center justify-end bg-offWhite">
          <div
            className={`break-word text-3xl relative flex items-center justify-center w-fit h-96 px-10 text-right w-40 mr-0  ${
              lang == "ar" ? "font-uni" : "font-gaia"
            }`}
          >
            {message}
          </div>
        </div>
        <div className="h-72 flex relative w-full bg-offWhite cursor-empireA overflow-hidden pb-10 items-center justify-center">
          <Marquee className="flex" pauseOnHover pauseOnClick direction="right">
            {MARQUEE_IMAGES.map((uri: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`h-60 w-60 relative mr-4 bg-lightYellow`}
                >
                  <Image
                    src={`${INFURA_GATEWAY_INTERNAL}${uri}`}
                    objectFit="cover"
                    layout="fill"
                    priority
                    unoptimized
                    draggable={false}
                    alt="F3Manifesto by Emma-Jane MacKinnon-Lee"
                  />
                </div>
              );
            })}
          </Marquee>
        </div>
        <div className="relative w-full flex items-center justify-center flex-col flex h-fit">
          <div className="relative w-full h-2 bg-lightYellow flex items-center justify-center"></div>
          <div className="relative w-full h-2 bg-midGray flex items-center justify-center"></div>
        </div>
      </div>
    );
  }

  return <RouterChange />;
}
