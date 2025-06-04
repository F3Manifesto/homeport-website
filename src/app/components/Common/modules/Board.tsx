import Image from "next/image";
import { FunctionComponent, JSX, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BOARD_IMAGES, INFURA_GATEWAY_INTERNAL } from "../../../lib/constants";
import { ModalContext } from "@/app/providers";
import { BoardProps } from "../types/common.types";
import { usePathname } from "next/navigation";

const Board: FunctionComponent<BoardProps> = ({
  dict,
  goShopping,
  handleURL,
}): JSX.Element => {
  const context = useContext(ModalContext);
  const path = usePathname();

  const [mainImages, setMainImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>(BOARD_IMAGES[0]);

  useEffect(() => {
    if (mainImages?.length < 1) {
      setMainImages(BOARD_IMAGES.sort(() => Math.random() - 0.5).slice(0, 5));
    }
  }, []);

  return (
    <div className="relative w-full h-full min-h-full flex items-center justify-start flex flex-col bg-offBlack">
      <div className="relative w-full flex h-10"></div>
      <div className="relative w-full flex flex-col xl:flex-row gap-5 items-start justify-between h-fit xl:h-[50rem] 2xl:h-fit 2xl:flex-col">
        <div className="relative w-full h-full flex items-center justify-start flex-col gap-12 bg-offWhite grow">
          <div className="relative w-full h-fit flex items-center justify-start flex-row px-2">
            <h1 className="font-emiken w-fit text-[10vw] md:text-[6vw] xl:text-[8.5vw] h-fit relative flex flex-row items-center justify-center">
              <div className="relative flex items-center justify-center w-fit h-fit">
                F
              </div>
              <div className="relative flex items-center justify-center font-atmos text-2xl galaxy:text-5xl xl:text-6xl wide:text-9xl w-fit h-fit top-1 galaxy:top-4 xl:top-10">
                3
              </div>
              <div className="relative flex items-center justify-center w-fit h-fit">
                MANIFESTO
              </div>
            </h1>
          </div>
          <div className="relative w-full h-full flex flex-col half:flex-row gap-10 sm:gap-5 items-start justify-between">
            <div className="relative w-full min-h-full h-full flex flex-col gap-10 items-center justify-between grow">
              <div className="relative w-full h-fit flex flex-col items-start justify-start gap-3">
                {mainImages?.map((uri: string, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`h-10 relative flex items-center justify-center cursor-empireS hover:opacity-70 bg-lightYellow active:bg-lightYellow active:mix-blend-color-burn ${
                        (index === 0 && "w-full") ||
                        (index === 1 && "w-10/12") ||
                        (index === 2 && "w-8/12") ||
                        (index === 3 && "w-6/12") ||
                        (index === 4 && "w-4/12")
                      }`}
                      onClick={() => setMainImage(uri)}
                    >
                      <Image
                        objectFit="cover"
                        layout="fill"
                        draggable={false}
                        src={`${INFURA_GATEWAY_INTERNAL}${uri}`}
                        alt="F3Manifesto by Emma-Jane MacKinnon-Lee"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="relative w-full half:w-72 h-fit flex items-center justify-start half:justify-center half:pl-0 pl-2 bottom-0">
                <div
                  className={`font-glitch h-fit w-full relative inline-table leading-tight cursor-empireS break-word ${
                    path?.includes("/en/")
                      ? "text-sm sm:text-base md:text-lg"
                      : "text-sm sm:text-base"
                  }`}
                >
                  {dict?.common?.glass}
                  <span className="font-air">,</span>
                  {dict?.common?.appeal}
                  <span className="font-air">,</span> {dict?.common?.status}
                  <span className="font-air">,</span> {dict?.common?.use}
                  <br />
                  <br />
                  {dict?.common?.worlds}
                  <span className="font-air">,</span> {dict?.common?.code}
                  <span className="font-air">,</span> {dict?.common?.whimsy}
                  <span>.</span>
                </div>
              </div>
            </div>
            <div className="relative w-full h-full flex flex-col sm:flex-row gap-10 sm:gap-3 items-center justify-center">
              <div className="relative w-fit h-fit flex items-center justify-center md:pl-0 sm:pl-2">
                <motion.div
                  whileHover={{
                    rotate: 360,
                  }}
                  onClick={() =>
                    setMainImages(
                      BOARD_IMAGES.sort(() => Math.random() - 0.5).slice(0, 5)
                    )
                  }
                  className={
                    "relative w-12 h-12 flex items-center justify-center cursor-empireS"
                  }
                >
                  <Image
                    layout="fill"
                    draggable={false}
                    src={`${INFURA_GATEWAY_INTERNAL}QmWcaVfpqyRB2BQ9swPHBB85fBTQSjQgoh4LNt1tWTXPmU`}
                    className="relative w-full h-full"
                    alt="loader"
                  />
                </motion.div>
              </div>
              <div className="flex items-center justify-center flex-col sm:flex-row gap-1.5 w-full md:w-fit h-full">
                <div className="relative w-fit h-full flex flex-col gap-4 items-center justify-center font-alber mb-0">
                  <div className="sm:h-20 xl:h-full 2xl:h-40 w-fit h-fit sm:rotate-90 whitespace-nowrap flex items-center justify-center">
                    100% CC0
                  </div>
                  <div className="sm:h-60 relative xl:h-full 2xl:h-80 h-fit w-fit sm:rotate-90 whitespace-nowrap flex items-center justify-center">
                    {dict?.common?.prompt}
                  </div>
                </div>
                <div className="relative w-full h-fit flex items-start justify-center">
                  <div className="relative w-full md:w-[40vw] h-[80vw] md:h-[40vw] xl:h-[35vw] xl:w-[30vw] flex items-center justify-center bg-offBlack">
                    <Image
                      priority
                      draggable={false}
                      src={`${INFURA_GATEWAY_INTERNAL}${mainImage}`}
                      layout="fill"
                      objectPosition={"top"}
                      objectFit="cover"
                      alt="F3Manifesto by Emma-Jane MacKinnon-Lee"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full 2xl:w-full xl:w-fit flex items-center justify-between grow flex-col gap-7 bg-gradient-to-r from-grad1 via-grad2 to-grad3 border-2 border-borderBlue py-3 xl:min-h-full xl:h-auto">
          <div className="relative w-3/4 h-fit flex items-center justify-center flex-row gap-5 flex-wrap">
            {[
              {
                image: "QmQVaJCzQ4uYUYKGAzHNy3rXpiygF1B2PSsYpvoWVspcKC",
                title: "DIGITALAX",
                link: "https://digitalax.xyz",
              },
              {
                link: "https://chromadin.xyz",
                image: "QmXM6QSYCbMJ5eXJHuGqMTbCTkaDqth5c4NswX2nWTpenB",
                title: "Chromadin",
              },
              {
                link: "https://cypher.digitalax.xyz",
                image: "QmYRZYGFKgH6wGJ39aWHbr7T1PsySh2kTSjo11yEZrrGcM",
                title: "Cypher",
              },
              {
                image: "QmbQkSmVxr6eqQ4TDUYu6cWLnXDsfykYXXXnjqeWPeSo5M",
                title: "Emancipa",
                link: "https://emancipa.xyz",
              },
              {
                image: "QmU6Y9rZQKGtnHhWhHz6HAUFMAdjf8MxNTxZScKtAR5fKF",
                title: "Synthetic Futures",
                link: "https://syntheticfutures.xyz",
              },
              {
                title: "Boudica",
                image: "QmerLASHD3GJTk87LYgVPY3ecSDxMsQ4DbNEowdTSr3ZvB",
                link: "https://boudica.emancipa.xyz",
              },
            ].map(
              (
                item: {
                  image: string;
                  title: string;
                  link: string;
                },
                index: number
              ) => {
                return (
                  <div
                    key={index}
                    className={`relative h-10 w-10 rounded-full flex cursor-empireS hover:rotate-12 items-center justify-center ${
                      index !== 0 && "border-2 border-black"
                    }`}
                    onClick={() => window.open(item.link)}
                    title={item.title}
                  >
                    <Image
                      src={`${INFURA_GATEWAY_INTERNAL}${item.image}`}
                      layout="fill"
                      className="rounded-full"
                      objectFit="cover"
                      draggable={false}
                      priority
                      alt={`${item.title} by Emma-Jane MacKinnon-Lee`}
                    />
                  </div>
                );
              }
            )}
          </div>
          <div className="relative w-full h-full flex items-center justify-center grow">
            <div className="relative w-full h-fit flex flex-wrap xl:flex-col gap-10 xl:gap-5 justify-center 2xl:px-6 xl:px-0 px-6 xl:justify-start items-center 2xl:justify-center 2xl:gap-10 2xl:flex-row flex-row 2xl:flex-wrap">
              {[
                {
                  image: "QmWTJSNcEuYBqzu1FDFu2XzWtCwqgKcYbXNVNU6Jhvsx1H",
                  title: {
                    es: "Brutalismo D.I.Y",
                    en: "D.I.Y Brutalism",
                    ym: "D.I.Y Brutalism",
                  },
                  code: "68 73 89",
                  reverse: false,
                  style: context?.filters?.styles?.[2]!,
                  width: "12",
                  height: "12",
                },
                {
                  image: "QmcK4e8wqP8p4YgQ5k3wMrFqwHTPL1Ex5vGQ1eHYNs6FLX",
                  title: {
                    es: "Retazos Digicore",
                    en: "Digicore Patchwork",
                    ym: "Digicore Patchwork",
                  },
                  code: "100 105 103 105",
                  reverse: true,
                  style: context?.filters?.styles?.[1]!,
                  width: "12",
                  height: "10",
                },
                {
                  image: "QmZJLFCwTWpbxGwVNxR5MFHgkq54PRWXhpL3REN5DxAeML",
                  title: {
                    es: "Americana Vintage",
                    en: "Vintage Americana",
                    ym: "Vintage Americana",
                  },
                  code: "118 105 110 116",
                  reverse: false,
                  style: context?.filters?.styles?.[0]!,
                  width: "12",
                  height: "10",
                },
                {
                  image: "QmdXPUuopyM2feMd275n2qLzD2qkY3ky44ct22tHFdqzQR",
                  title: {
                    es: "Cottagecore Web Kitsch",
                    en: "Cottagecore Web Kitsch",
                    ym: "Cottagecore Web Kitsch",
                  },
                  code: "119 101 98",
                  reverse: true,
                  style: context?.filters?.styles?.[4]!,
                  width: "16",
                  height: "12",
                },
                {
                  image: "QmSu8HaEDZAy1CXAPoogGrmdtBkps8Rjk3bwcDEr9No6HP",
                  title: {
                    es: "LoFi Ropa Tec",
                    en: "LoFi Tech Wear",
                    ym: "LoFi Tech Girri'",
                  },
                  code: "108 111 102 105",
                  reverse: false,
                  style: context?.filters?.styles?.[3]!,
                  width: "16",
                  height: "12",
                },
              ].map(
                (
                  item: {
                    image: string;
                    title: {
                      en: string;
                      es: string;
                    };
                    code: string;
                    reverse: boolean;
                    style: string;
                    width: string;
                    height: string;
                  },
                  index: number
                ) => {
                  return (
                    <div
                      key={index}
                      className="relative flex flex-row w-fit h-fit gap-3 items-center justify-center"
                    >
                      <div
                        className={`relative w-fit h-fit flex items-center justify-center flex-col gap-1 ${
                          item.reverse ? "order-first" : "order-last"
                        }`}
                      >
                        <div className="relative w-fit h-fit flex items-center justify-center border border-offWhite text-darkP font-firaL text-xxs whitespace-nowrap p-1">
                          {item.code}
                        </div>
                        <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-3">
                          <div className="relative w-fit h-fit flex items-center justify-center text-xs font-fira text-darkP">{`0${
                            index + 1
                          }`}</div>
                          <div className="relative w-fit h-fit flex items-start justify-center font-fira text-darkP text-md flex-col gap-1">
                            <div className="relative w-fit h-fit flex items-center justify-center">
                              {
                                item.title?.[
                                  path.match(
                                    /(?<=\/)(en|es|ar|ym)(?=\/)/
                                  )?.[0] as any as "es" | "en"
                                ]?.split(" ")[0]
                              }
                            </div>
                            <div className="relative font-firaB w-fit h-fit flex items-center justify-center">
                              {item.title?.[
                                path.match(
                                  /(?<=\/)(en|es|ar|ym)(?=\/)/
                                )?.[0] as any as "es" | "en"
                              ]?.substring(
                                item.title?.[
                                  path.match(
                                    /(?<=\/)(en|es|ar|ym)(?=\/)/
                                  )?.[0] as any as "es" | "en"
                                ]?.indexOf(" ") + 1
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`relative w-fit h-fit flex items-center hover:rotate-45 justify-center cursor-empireS ${
                          item.reverse ? "order-last" : "order-first"
                        }`}
                        onClick={() => {
                          goShopping();
                          handleURL("style", item.style);
                        }}
                      >
                        <div
                          className={`relative w-${item.width} h-${item.height} flex items-center justify-center`}
                        >
                          <Image
                            layout="fill"
                            draggable={false}
                            src={`${INFURA_GATEWAY_INTERNAL}${item.image}`}
                            priority
                            alt="F3Manifesto"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="relative h-fit w-full px-3 py-2 flex items-center justify-center flex-col">
            <div className="relative leading-snug w-fit h-fit text-xs font-firaL text-center break-word flex items-center justify-center">
              {dict?.common?.micro} <br />
              <br />
              {dict?.common?.virt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
