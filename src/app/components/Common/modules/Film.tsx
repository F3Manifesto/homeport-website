import { FunctionComponent, JSX, useState } from "react";
import { INFURA_GATEWAY_INTERNAL } from "../../../lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useLanguage from "../hooks/useLanguage";

const Film: FunctionComponent<{ dict: any }> = ({ dict }): JSX.Element => {
  const router = useRouter();
  const { changeLanguage, openLanguages, setOpenLanguages } = useLanguage();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <div className="relative w-full h-fit flex items-start justify-start">
      <div
        className="flex items-center justify-center h-60 galaxy:h-80 sm:h-screen w-full relative bg-offBlack"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpenLanguages(false);
          setOpenMenu(false);
        }}
      >
        <div className="absolute top-0 right-3 w-fit h-full flex items-center justify-between z-30 flex-col gap-3">
          <div className="relative w-fit h-fit flex items-center justify-center flex-col gap-2 mt-0 top-5">
            <div
              className={`cursor-empireS relative flex items-center justify-center w-12 h-9`}
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenu(!openMenu);
              }}
            >
              <Image
                layout="fill"
                draggable={false}
                src={`${INFURA_GATEWAY_INTERNAL}QmebjCsHCiUWzxMwdjYwQcF1CigsNva6g1HH2vCvmiJNcu`}
                priority
                alt="F3Manifesto"
              />
            </div>
            {openMenu && (
              <div className="absolute text-right flex items-center justify-center h-fit font-alber text-offBlack text-sm top-10 flex-col bg-gradient-to-r from-grad1 via-grad2 to-grad3 rounded-md right-0 border border-offBlack w-[8rem]">
                <div
                  className="relative w-3/4 h-fit flex items-center justify-center text-sm cursor-empireS pb-2 text-center py-1 px-1 hover:opacity-70"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/orders");
                  }}
                >
                  {dict?.common?.orders}
                </div>
              </div>
            )}
          </div>
          <div className="relative mb-0 bottom-5 flex items-center justify-center w-fit h-fit cursor-empireS">
            {openLanguages && (
              <div className="absolute text-right flex items-center justify-center h-fit font-alber text-offBlack text-sm bottom-10 flex-col bg-gradient-to-r from-grad1 via-grad2 to-grad3 rounded-md right-0 border border-offBlack w-[8rem]">
                <div className="relative w-3/4 h-fit flex items-center justify-center text-xs pb-2 text-center py-1 px-1">
                  {dict?.common?.trad}
                </div>
                {[
                  {
                    image: "QmUSR6zQuNTLy3WGHBMDcyBJ7DHXGJxuiJuoLJ1V2MyKTb",
                    name: "en",
                  },
                  {
                    image: "QmYQBkpgirwnNhteymuJci9FHH4Sq2eAEEDDGjNDRkXKWc",
                    name: "es",
                  },
                  {
                    image: "QmZVU5rZxU1REJHNHtScLuNgeKMoDVK4ruwuP7tSznTqUg",
                    name: `ع ${dict?.common?.soon}`,
                  },
                  {
                    image: "QmX5L5R7y2dbFM3mEqWsydsadcScebnUDdeYJW7mWirX5d",
                    name: `א ${dict?.common?.soon}`,
                  },
                  {
                    image: "QmRq7WA5H9ghy5qX1FuLLpj9EZvgZyWMuvsyPkGFyVG5ap",
                    name: `br ${dict?.common?.soon}`,
                  },
                  {
                    image: "QmfRNNJKQ8QxuvdjTh1u5T1JW8WCH3cfsixd5FnGNxVD1m",
                    name: `ук ${dict?.common?.soon}`,
                  },
                  {
                    image: "QmdbSbop2xMqYEyYk3hErLF9nQmmsFtLSsrwzQgkad9Koo",
                    name: `د ${dict?.common?.soon}`,
                  },
                  {
                    image: "QmXzFXL5rxoqUei2X2rVEMZ5a91d4U6ommUBq4XeFHsA5k",
                    name: `あ ${dict?.common?.soon}`,
                  },
                  {
                    image: "QmSG2wdnpEB8xnfmqM7gVhM6BiA2m9GhSJwXSVkQ9JXT3Z",
                    name: `yi ${dict?.common?.soon}`,
                  },
                  {
                    image: "QmPkEFY3L1EnKgALyhgpYnnUXtt8KQNcSAUEPiiJcQyhEU",
                    name: `fr ${dict?.common?.soon}`,
                  },
                  {
                    image: "QmURxxCvHcRZQNEPvGnEXjJW57iiu7uBDk9AR8JaPN8ooa",
                    name: `ç ${dict?.common?.soon}`,
                  },
                  {
                    image: "QmWeNpFCobF9AP4PeLErQ79HxRayedhJGb2nPKtEcTvpn4",
                    name: `ű ${dict?.common?.soon}`,
                  },
                  {
                    image: "QmfHYdrJSrmPHNaGMqzenCq9w2tKSs7NFUcB97MXuHz1cB",
                    name: `ŋ ${dict?.common?.soon}`,
                  },
                  {
                    image: "QmNcb5wckWSPzDDv1fTh7otCKQvrYUP8bEQMHjM62NDHyD",
                    name: `gd ${dict?.common?.soon}`,
                  },
                ].map(
                  (
                    item: {
                      image: string;
                      name: string;
                    },
                    index: number
                  ) => {
                    return (
                      <div
                        key={index}
                        className={`relative w-full h-12 flex items-center px-2 justify-center flex-row gap-2 ${
                          index == 0
                            ? "border-y border-offBlack"
                            : index !== 9 && "border-b border-offBlack"
                        } ${
                          (index === 0 || index === 1) &&
                          "hover:opacity-80 cursor-empireS"
                        }`}
                        onClick={() => {
                          if (index === 0 || index === 1) {
                            changeLanguage(item.name);
                          }
                        }}
                      >
                        <div className="relative w-fit h-fit flex items-center justify-center">
                          <div className="relative w-6 h-6 flex items-center justify-center">
                            <Image
                              alt="F3Manifesto"
                              draggable={false}
                              src={`${INFURA_GATEWAY_INTERNAL}${item.image}`}
                              layout="fill"
                            />
                          </div>
                        </div>
                        <div className="relative w-fit h-fit flex items-center justify-center text-center">
                          {item.name}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
            <div
              className="relative w-10 h-4 flex items-center justify-center cursor-empireS"
              onClick={(e) => {
                e.stopPropagation();
                setOpenLanguages(!openLanguages);
              }}
            >
              <Image
                draggable={false}
                src={`${INFURA_GATEWAY_INTERNAL}Qmdp2EmTueHenNAyq8PvyURCvWFFpXbSx3Dw2exQ3naYYL`}
                priority
                layout="fill"
                alt="F3Manifesto"
              />
            </div>
          </div>
        </div>
        <div className="relative min-h-full h-full w-full">
          <video
            className="relative h-full flex items-center justify-center w-full object-cover"
            autoPlay
            muted
            loop
            src={`${INFURA_GATEWAY_INTERNAL}Qmaa9dTmhyvSQifLqciAVdNEAHmvRRpxcvawRxGdnM8mCe`}
            poster={`${INFURA_GATEWAY_INTERNAL}Qma9uA5oK2yfr2upLoYjAnuZ6q1xBd5bu7yXac6ZfESV8G`}
          ></video>
          <div className="absolute top-0 left-16 hidden sm:flex items-center justify-center w-fit h-full p-4">
            <div className="relative flex w-full h-full items-start justify-between flex-col gap-10">
              {[
                { image: "QmNS1DJqH8XEXSoAVRtJ89iegcTQvu8nZPo79ozNgHPMmp" },
                {
                  image: "QmSweJiaPzfewwfFxPiJ1ERhoy25DXK5RCGtzdaoovgviE",
                  link: "https://kinora.irrevocable.dev/video/0x01c6a9-0x49",
                },
                {
                  image: "QmdmACJZ2erwjM6pQVobqi9c2nkAzSDS8CNBv91csyGUZd",
                  link: "https://kinora.irrevocable.dev/video/0x01c6a9-0x48",
                },
              ].map(
                (
                  video: {
                    image: string;
                    link?: string;
                  },
                  index: number
                ) => {
                  return (
                    <div
                      className="relative w-fit h-full flex items-center justfiy-center"
                      key={index}
                    >
                      <div
                        className="relative flex items-center justify-center w-44 h-full rounded-3xl bg-offBlue border-offBlue shadow-film shadow-rose-600 cursor-empireS border-b-2 border-t-4 border-r-4 half:border-r-8"
                        onClick={() => video.link && window.open(video.link)}
                      >
                        <video
                          autoPlay
                          muted
                          loop
                          className="absolute max-h-full max-w-none h-full w-full object-cover rounded-3xl opacity-70"
                        >
                          <source
                            src={`${INFURA_GATEWAY_INTERNAL}${video.image}`}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Film;
