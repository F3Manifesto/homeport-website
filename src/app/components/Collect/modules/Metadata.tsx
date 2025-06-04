import Image from "next/image";
import { FunctionComponent, JSX, useContext, useRef } from "react";
import {
  ACCEPTED_TOKENS,
  INFURA_GATEWAY_INTERNAL,
} from "../../../lib/constants";
import { AiOutlineLoading } from "react-icons/ai";
import { usePathname } from "next/navigation";
import descriptionRegex from "@/app/lib/helpers/descriptionRegex";
import { MetadataProps } from "../types/collect.types";
import useCheckout from "../hooks/useCheckout";
import { useAccount } from "wagmi";
import { useModal } from "connectkit";
import useLens from "../../Common/hooks/useLens";
import { ModalContext } from "@/app/providers";
import InteractBar from "./InteractBar";

const Metadata: FunctionComponent<MetadataProps> = ({
  dict,
  item,
  post,
}): JSX.Element => {
  const collectRef = useRef<null | HTMLDivElement>(null);
  const { chainId, address, isConnected } = useAccount();
  const { openOnboarding, openSwitchNetworks } = useModal();
  const { handleLensConnect, lensLoading } = useLens(address, dict);
  const {
    details,
    setDetails,
    collectPostLoading,
    approveLoading,
    approved,
    approveFunds,
    collectItem,
  } = useCheckout(item, address, dict);

  const context = useContext(ModalContext);
  const path = usePathname();
  return (
    <div className="relative w-full h-fit flex flex-col gap-3">
      <div className="relative w-full h-fit sm:h-[25rem] flex-col sm:flex-row flex border-offBlack border-4 items-start justify-start bg-lightY">
        <div className="relative w-full lg:w-96 h-full flex flex-col gap-3 p-4 items-start justify-between">
          <div className="relative w-full sm:w-fit h-fit flex items-start justify-start">
            <div className="relative w-fit h-fit flex font-firaL text-5xl text-black">
              ${Number(item?.price) / 10 ** 18}
            </div>
          </div>
          <InteractBar post={post!} dict={dict} />
          <div className="relative w-fit h-fit pb-8 galaxy:pb-0 flex flex-col font-firaM gap-2">
            {[
              {
                title:
                  Number(item?.amount) == Number(item?.tokenIdsMinted?.length)
                    ? dict?.collect?.sold
                    : Number(item?.tokenIdsMinted?.length) > 0
                    ? `${Number(item?.tokenIdsMinted?.length)} / ${Number(
                        item?.amount
                      )}`
                    : `${Number(item?.amount)} / ${Number(item?.amount)}`,
                color: "#BB552D",
              },
              {
                title: "CC0",
                color: "#462D4A",
              },
              {
                title:
                  dict?.collect?.[item?.metadata?.sex?.toLowerCase() || ""],
                color: "#8BCDF4",
              },
              {
                title: item?.drop?.metadata?.title!,
                color: "#B42AA1",
              },
            ]?.map(
              (
                item: {
                  title: string;
                  color: string;
                },
                index: number
              ) => {
                return (
                  <div
                    key={index}
                    className="relative w-fit h-fit flex gap-1 flex-row items-center justify-center"
                  >
                    <div className="relative w-2 h-4 flex items-center justify-center">
                      <Image
                        src={`${INFURA_GATEWAY_INTERNAL}QmaercaFRN5CogxWiB5TVdDMG42XY2Uf7MD5zHfQgJKEWQ`}
                        layout="fill"
                        alt="Arrow"
                        priority
                        draggable={false}
                      />
                    </div>
                    <div
                      className={`relative flex items-center justify-center w-fit h-fit px-1 sm:px-3 py-0.5 border-2 border-black text-xs rounded-lg hover:bg-lightPurple cursor-empireS`}
                      style={{
                        color: item.color,
                      }}
                    >
                      {item?.title}
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="relative w-full h-fit row-start-3 grid grid-flow-row auto-rows-auto">
            <div className="relative w-fit h-fit row-start-1 text-offBlack text-lg font-firaB">
              {dict?.collect?.style}
            </div>
            <div className="relative w-full h-1 row-start-2 bg-offBlack"></div>
            <div className="relative w-fit h-fit row-start-3 grid grid-flow-col auto-cols-auto pt-3 gap-2">
              <div className="relative col-start-1 w-fit h-fit">
                <div className="relative h-10 w-16 border-r-4 border-t-2 border-b-2 border-l-2 border-offBlack rounded-md bg-lightWhite place-self-center grid grid-flow-col auto-cols-auto hover:rotate-6 cursor-empireS hover:mix-blend-exclusion">
                  <div className="relative h-6 w-10 col-start-1 place-self-center">
                    <Image
                      src={`${INFURA_GATEWAY_INTERNAL}${
                        [
                          {
                            name: {
                              es: "Americana Vintage",
                              en: "Vintage Americana",
                              ym: "Vintage Americana",
                            },
                            image:
                              "QmZJLFCwTWpbxGwVNxR5MFHgkq54PRWXhpL3REN5DxAeML",
                          },
                          {
                            name: {
                              es: "Retazos Digicore",
                              en: "Digicore Patchwork",
                              ym: "Digicore Patchwork",
                            },
                            image:
                              "QmcK4e8wqP8p4YgQ5k3wMrFqwHTPL1Ex5vGQ1eHYNs6FLX",
                          },
                          {
                            name: {
                              es: "Brutalismo DIY",
                              en: "DIY Brutalism",
                              ym: "DIY Brutalism",
                            },
                            image:
                              "QmWTJSNcEuYBqzu1FDFu2XzWtCwqgKcYbXNVNU6Jhvsx1H",
                          },
                          {
                            name: {
                              es: "LoFi Ropa Tec",
                              en: "LoFi Tech Wear",
                              ym: "LoFi Tech Girri'",
                            },
                            image:
                              "QmSu8HaEDZAy1CXAPoogGrmdtBkps8Rjk3bwcDEr9No6HP",
                          },
                          {
                            name: {
                              es: "Cottagecore Web Kitsch",
                              en: "Cottagecore Web Kitsch",
                              ym: "Cottagecore Web Kitsch",
                            },
                            image:
                              "QmdXPUuopyM2feMd275n2qLzD2qkY3ky44ct22tHFdqzQR",
                          },
                        ]?.filter(
                          (value) =>
                            value?.name?.[
                              path.match(
                                /(?<=\/)(en|es|ar|ym)(?=\/)/
                              )?.[0] as any as "es" | "en"
                            ]?.toLowerCase() ==
                              item?.metadata?.style?.toLowerCase() ||
                            value?.name?.en?.toLowerCase() ==
                              item?.metadata?.style?.toLowerCase()
                        )?.[0]?.image
                      }`}
                      objectFit="contain"
                      layout="fill"
                      alt="Profile Image"
                      priority
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
              <div className="relative col-start-2 w-fit h-fit text-offBlack text-base font-fira place-self-center">
                {
                  dict?.collect?.[
                    item?.metadata?.style?.replaceAll(" ", "")?.toLowerCase() ??
                      ""
                  ]
                }
              </div>
            </div>
          </div>
        </div>
        <div className="relative sm:flex hidden w-px h-full bg-offBlack"></div>
        <div className="relative w-full h-full flex flex-col p-4 items-end overflow-y-scroll justify-between">
          <div
            className={`relative w-full flex flex-col gap-4 justify-between items-end ${
              item?.metadata?.extra?.trim() !== "" && item?.metadata?.extra
                ? "h-fit"
                : "h-full"
            }`}
          >
            <div className="flex relative md:w-3/4 mr-0 w-full h-fit text-offBlack font-firaM text-sm text-right justify-end items-end">
              {item?.metadata?.description}
            </div>
            <div className="relative w-full h-0.5 bg-offBlack justify-end flex"></div>
            <div className="relative w-full h-fit flex flex-col gap-2 items-end justify-end overflow-y-scroll">
              <div className="relative w-fit h-fit flex text-offBlack font-firaB text-lg justify-end items-end">
                {item?.metadata?.extra?.trim() !== "" && item?.metadata?.extra
                  ? dict?.collect?.extra
                  : dict?.collect?.graph}
              </div>
              <div
                className="relative w-full h-fit text-offBlack font-firaL text-sm text-right flex items-start justify-end whitespace-inline overflow-y-scroll"
                dangerouslySetInnerHTML={{
                  __html: descriptionRegex(
                    item?.metadata?.extra?.trim() !== "" &&
                      item?.metadata?.extra
                      ? item?.metadata?.extra || ""
                      : item?.metadata?.prompt || "",
                    false
                  ),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative w-full h-fit flex border-offBlack border-4 flex-col lg:flex-row items-end justify-end bg-lightY p-4 gap-8 lg:gap-4 overflow-y-scroll"
        ref={collectRef}
      >
        <div className="relative justify-between items-start flex flex-col gap-4 w-full h-full">
          <div className="relative w-full h-fit flex flex-col items-start justify-start gap-5">
            <div className="relative w-fit h-fit flex text-offBlack font-firaB text-2xl">
              {dict?.collect?.details}
            </div>
            <div className="relative w-fit h-fit flex text-sol font-firaL text-xs opacity-90">
              {dict?.collect?.encrypt}
            </div>
            <div className="relative flex flex-row flex-wrap items-start justify-start gap-5 w-full h-fit">
              {[
                { tag: "address", title: dict?.collect?.address },
                { tag: "zip", title: dict?.collect?.zip },
                { tag: "city", title: dict?.collect?.city },
                { tag: "state", title: dict?.collect?.state },
                { tag: "country", title: dict?.collect?.country },
              ].map((item: { title: string; tag: string }, index: number) => {
                return (
                  <div
                    key={index}
                    className={`relative w-fit h-fit flex items-start justify-center flex-col gap-2`}
                  >
                    <div className="relative w-fit h-fit flex text-offBlack font-fira text-xs">
                      {item.title}
                    </div>

                    <input
                      className={`relative border border-black rounded-md flex bg-lightYellow font-fira text-offBlack p-2 h-10 w-40 text-xs`}
                      placeholder={
                        (details as any)?.[item.title?.toLowerCase()] || ""
                      }
                      onChange={(e) => {
                        setDetails((prev) => ({
                          ...prev,
                          [item.tag?.toLowerCase()]: e.target.value,
                        }));
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="relative justify-between items-end flex flex-col gap-4 w-full h-full">
          {item?.metadata?.extra?.trim() !== "" && item?.metadata?.extra && (
            <div className="w-full flex flex-row items-start justify-start lg:justify-end gap-3 flex-wrap">
              {["XS", "S", "M", "L", "XL", "2XL"].map(
                (t: string, indice: number) => {
                  return (
                    <div
                      key={indice}
                      className={`relative border border-black rounded-md flex items-center justify-center font-fira text-offBlack p-2 h-8 w-8 text-xs cursor-empireS hover:bg-brightGreen ${
                        details?.tamano == t
                          ? "bg-brightGreen"
                          : "bg-lightYellow"
                      }`}
                      onClick={() =>
                        setDetails((prev) => ({
                          ...prev,
                          tamano: t,
                        }))
                      }
                    >
                      <div className="flex relative items-center justify-center">
                        {t}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
          <div className="relative w-full flex flex-col gap-4 items-end justify-end">
            <div className="relative w-full h-full flex items-end justify-end flex-col gap-6 mr-0">
              <div className="relative w-full h-fit flex flex-col items-end justify-end gap-3">
                <div className="relative w-fit h-fit flex text-offBlack font-fira text-sm">
                  {`${Number(
                    (
                      Number(item?.price) /
                      Number(
                        context?.oracleData?.find(
                          (oracle) =>
                            oracle.currency?.toLowerCase() ===
                            details?.checkoutCurrency?.toLowerCase()
                        )?.rate
                      )
                    )?.toFixed(3)
                  )} ${
                    ACCEPTED_TOKENS?.find(
                      (item) =>
                        item[2]?.toLowerCase() ===
                        details?.checkoutCurrency?.toLowerCase()
                    )?.[1]
                  }`}
                </div>
                <div className="relative flex flex-row flex-wrap items-end justify-end gap-3 w-full h-fit">
                  {ACCEPTED_TOKENS?.filter((value) =>
                    item?.acceptedTokens
                      ?.map((item: string) => item.toLowerCase())
                      ?.includes(value?.[2].toLowerCase())
                  )?.map((item: string[], indexTwo: number) => {
                    return (
                      <div
                        className={`relative w-fit h-fit rounded-full flex items-center cursor-empireS active:scale-95 ${
                          details?.checkoutCurrency?.toLowerCase() ===
                          item[2]?.toLowerCase()
                            ? "opacity-50"
                            : "opacity-100"
                        }`}
                        key={indexTwo}
                        onClick={() =>
                          setDetails((prev) => ({
                            ...prev,
                            checkoutCurrency: item[2],
                          }))
                        }
                      >
                        <div className="relative w-5 h-5 flex">
                          <Image
                            layout="fill"
                            src={`${INFURA_GATEWAY_INTERNAL}${item[0]}`}
                            className="flex rounded-full"
                            draggable={false}
                            alt={item[1]}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className={`relative w-44 px-2 h-10 text-center py-1 border border-black rounded-md flex items-center justify-center text-offBlack bg-brightGreen font-jacklane text-sm mr-0 ${
                approveLoading ||
                collectPostLoading ||
                Number(item?.tokenIdsMinted?.length || 0) + 1 >
                  Number(item?.amount)
                  ? "opacity-70"
                  : "cursor-empireS active:scale-95"
              }`}
              onClick={
                !approveLoading &&
                !collectPostLoading &&
                Number(item?.tokenIdsMinted?.length || 0) + 1 <=
                  Number(item?.amount)
                  ? !isConnected
                    ? () => openOnboarding()
                    : isConnected && chainId !== 232
                    ? () => openSwitchNetworks()
                    : isConnected && !context?.lensConectado?.profile
                    ? () => !lensLoading && handleLensConnect()
                    : !approved
                    ? () => approveFunds()
                    : () => collectItem()
                  : () => {}
              }
            >
              <div
                className={`${
                  (approveLoading || collectPostLoading) && "animate-spin"
                } flex items-center justify-center`}
              >
                {approveLoading || collectPostLoading ? (
                  <AiOutlineLoading size={15} color="black" />
                ) : Number(item?.tokenIdsMinted?.length) + 1 >
                  Number(item?.amount) ? (
                  dict?.collect?.sold
                ) : !isConnected ? (
                  dict?.collect?.connect
                ) : isConnected && !context?.lensConectado?.profile ? (
                  "LENS"
                ) : !approved ? (
                  dict?.collect?.app
                ) : (
                  dict?.collect?.coll
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
