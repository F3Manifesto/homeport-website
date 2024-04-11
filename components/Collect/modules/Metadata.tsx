import Image from "next/image";
import { FunctionComponent } from "react";
import {
  ACCEPTED_TOKENS,
  COUNTRIES,
  INFURA_GATEWAY,
} from "../../../lib/constants";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import InteractBar from "../../Home/modules/InteractBar";
import { MetadataProps } from "../types/collect.types";

const Metadata: FunctionComponent<MetadataProps> = ({
  item,
  openDropdown,
  setOpenDropdown,
  details,
  setDetails,
  rate,
  approveLoading,
  collectPostLoading,
  isApprovedSpend,
  approveSpend,
  collectItem,
  dispatch,
  like,
  mirror,
  router,
  mainInteractionsLoading,
  walletConnected,
  lensProfile,
  openConnectModal,
  commentRef,
  collectRef,
  handleSignIn,
  address,
  t,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex flex-col gap-3">
      <div className="relative w-full h-fit sm:h-[25rem] flex-col sm:flex-row flex border-offBlack border-4 items-start justify-start bg-lightY">
        <div className="relative w-full lg:w-96 h-full flex flex-col gap-3 p-4 items-start justify-between">
          <div className="relative w-full sm:w-fit h-fit flex items-start justify-start">
            <div className="relative w-fit h-fit flex font-firaL text-5xl text-black">
              ${Number(item?.prices?.[0])}
            </div>
          </div>
          <InteractBar
            token={item!}
            like={like}
            dispatch={dispatch}
            mirror={mirror}
            router={router}
            index={0}
            interactionLoaders={mainInteractionsLoading}
            connected={walletConnected}
            lensConnected={lensProfile}
            openConnectModal={openConnectModal}
            hideComment={() =>
              commentRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            hideCollect={() =>
              collectRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            main
          />
          <div className="relative w-fit h-fit pb-8 galaxy:pb-0 flex flex-col font-firaM gap-2">
            {[
              {
                title:
                  Number(item?.amount) == Number(item?.soldTokens)
                    ? t("sold")
                    : Number(item?.soldTokens) > 0
                    ? `${Number(item?.soldTokens)} / ${Number(item?.amount)}`
                    : `${Number(item?.amount)} / ${Number(item?.amount)}`,
                color: "#BB552D",
              },
              {
                title: "CC0",
                color: "#462D4A",
              },
              {
                title: item?.collectionMetadata?.sex!,
                color: "#8BCDF4",
              },
              {
                title: item?.dropMetadata?.dropTitle!,
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
                        src={`${INFURA_GATEWAY}/ipfs/QmaercaFRN5CogxWiB5TVdDMG42XY2Uf7MD5zHfQgJKEWQ`}
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
              {t("style")}
            </div>
            <div className="relative w-full h-1 row-start-2 bg-offBlack"></div>
            <div className="relative w-fit h-fit row-start-3 grid grid-flow-col auto-cols-auto pt-3 gap-2">
              <div className="relative col-start-1 w-fit h-fit">
                <div className="relative h-10 w-16 border-r-4 border-t-2 border-b-2 border-l-2 border-offBlack rounded-md bg-lightWhite place-self-center grid grid-flow-col auto-cols-auto hover:rotate-6 cursor-empireS hover:mix-blend-exclusion">
                  <div className="relative h-6 w-10 col-start-1 place-self-center">
                    <Image
                      src={`${INFURA_GATEWAY}/ipfs/${
                        [
                          {
                            name: {
                              es: "Americana Vintage",
                              en: "Vintage Americana",
                            },
                            image:
                              "QmZJLFCwTWpbxGwVNxR5MFHgkq54PRWXhpL3REN5DxAeML",
                          },
                          {
                            name: {
                              es: "Retazos Digicore",
                              en: "Digicore Patchwork",
                            },
                            image:
                              "QmcK4e8wqP8p4YgQ5k3wMrFqwHTPL1Ex5vGQ1eHYNs6FLX",
                          },
                          {
                            name: {
                              es: "Brutalismo DIY",
                              en: "DIY Brutalism",
                            },
                            image:
                              "QmWTJSNcEuYBqzu1FDFu2XzWtCwqgKcYbXNVNU6Jhvsx1H",
                          },
                          {
                            name: {
                              es: "LoFi Ropa Tec",
                              en: "LoFi Tech Wear",
                            },
                            image:
                              "QmSu8HaEDZAy1CXAPoogGrmdtBkps8Rjk3bwcDEr9No6HP",
                          },
                          {
                            name: {
                              es: "Cottagecore Web Kitsch",
                              en: "Cottagecore Web Kitsch",
                            },
                            image:
                              "QmdXPUuopyM2feMd275n2qLzD2qkY3ky44ct22tHFdqzQR",
                          },
                        ]?.filter(
                          (value) =>
                            value?.name?.[
                              router.locale as "en" | "es"
                            ]?.toLowerCase() ==
                              item?.collectionMetadata?.style?.toLowerCase() ||
                            value?.name?.en?.toLowerCase() ==
                              item?.collectionMetadata?.style?.toLowerCase()
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
                {item?.collectionMetadata?.style}
              </div>
            </div>
          </div>
        </div>
        <div className="relative sm:flex hidden w-px h-full bg-offBlack"></div>
        <div className="relative w-full h-full flex flex-col p-4 items-end overflow-y-scroll justify-between">
          <div className="relative w-full h-full flex flex-col gap-4 justify-between items-end">
            <div className="flex relative md:w-3/4 mr-0 w-full h-fit text-offBlack font-firaM text-sm text-right justify-end items-end">
              {item?.collectionMetadata?.description}
            </div>
            <div className="relative w-full h-0.5 bg-offBlack justify-end flex"></div>
            <div className="relative w-full h-fit flex flex-col gap-2 items-end justify-end">
              <div className="relative w-fit h-fit flex text-offBlack font-firaB text-lg justify-end items-end">
                {t("graph")}
              </div>
              <div className="relative w-full h-fit text-offBlack font-firaL text-sm text-right flex items-end justify-end">
                {item?.collectionMetadata?.prompt}
              </div>
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
              {t("details")}
            </div>
            <div className="relative w-fit h-fit flex text-sol font-firaL text-xs opacity-90">
              {t("encrypt")}
            </div>
            <div className="relative flex flex-row flex-wrap items-start justify-start gap-5 w-full h-fit">
              {[
                {
                  title: t("name"),
                  drop: false,
                },
                {
                  title: t("address"),
                  drop: false,
                },
                {
                  title: t("zip"),
                  drop: false,
                },
                {
                  title: t("city"),
                  drop: false,
                },
                {
                  title: t("state"),
                  drop: false,
                },
                {
                  title: t("country"),
                  drop: true,
                },
              ].map(
                (
                  item: {
                    title: string;
                    drop: boolean;
                  },
                  index: number
                ) => {
                  return (
                    <div
                      key={index}
                      className={`relative w-fit h-fit flex items-start justify-center flex-col gap-2`}
                    >
                      <div className="relative w-fit h-fit flex text-offBlack font-fira text-xs">
                        {item?.title}
                      </div>
                      {item?.drop ? (
                        <div className="relative w-fit h-fit flex flex-col items-start justify-start gap-1">
                          <div
                            className={`relative h-10 flex flex-row justify-between p-2 w-40 items-center justify-center bg-lightYellow border border-black rounded-md cursor-pointer`}
                            onClick={() => setOpenDropdown(!openDropdown)}
                          >
                            <div className="relative w-fit h-fit flex items-center justify-center font-fira text-offBlack text-xs">
                              {details?.country}
                            </div>
                            <div className="relative w-4 h-3 flex items-center justify-center mix-blend-multiply">
                              <IoIosArrowDown size={15} color="black" />
                            </div>
                          </div>
                          {openDropdown && (
                            <div className="absolute top-10 bg-lightYellow z-10 w-40 h-60 flex border border-black rounded-md overflow-y-scroll">
                              <div className="relative w-full h-fit flex flex-col items-center justify-start">
                                {COUNTRIES?.map(
                                  (country: string, index: number) => {
                                    return (
                                      <div
                                        key={index}
                                        className="relative w-full py-1 h-10 flex items-center justify-center text-offBlack border-b border-black font-fira text-xs cursor-pointer hover:opacity-80"
                                        onClick={() => {
                                          setOpenDropdown(false);
                                          setDetails((prev) => ({
                                            ...prev,
                                            country,
                                          }));
                                        }}
                                      >
                                        {country}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          className={`relative border border-black rounded-md flex bg-lightYellow font-fira text-offBlack p-2 h-10 w-40 text-xs`}
                          placeholder={
                            (details as any)?.[item?.title?.toLowerCase()] || ""
                          }
                          onChange={(e) => {
                            setDetails((prev) => ({
                              ...prev,
                              [item?.title?.toLowerCase()]: e.target.value,
                            }));
                          }}
                        />
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className="relative justify-end items-end flex flex-col gap-4 w-full h-full">
          <div className="relative w-full h-full flex items-end justify-end flex-col gap-6 mr-0">
            <div className="relative w-full h-fit flex flex-col items-end justify-end gap-3">
              <div className="relative w-fit h-fit flex text-offBlack font-fira text-sm">
                {`${Number(
                  ((Number(item?.prices?.[0]) * 10 ** 18) / rate)?.toFixed(3)
                )} ${
                  ACCEPTED_TOKENS?.find(
                    (item) =>
                      item[2]?.toLowerCase() ===
                      details?.checkoutCurrency?.toLowerCase()
                  )?.[1]
                }`}
              </div>
              <div className="relative flex flex-row flex-wrap items-end justify-end gap-5 w-full h-fit">
                {ACCEPTED_TOKENS?.filter((value) =>
                  item?.acceptedTokens
                    ?.map((item: string) => item.toLowerCase())
                    ?.includes(value?.[2])
                )?.map((item: string[], indexTwo: number) => {
                  return (
                    <div
                      className={`relative w-fit h-fit rounded-full flex items-center cursor-pointer active:scale-95 ${
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
                      <Image
                        src={`${INFURA_GATEWAY}/ipfs/${item[0]}`}
                        className="flex rounded-full"
                        draggable={false}
                        width={30}
                        height={35}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className={`relative w-44 px-2 h-10 text-center py-1 border border-black rounded-md flex items-center justify-center text-offBlack bg-brightGreen font-jacklane text-sm mr-0 ${
              !approveLoading &&
              !collectPostLoading &&
              details?.city?.trim() !== "" &&
              details?.country?.trim() !== "" &&
              details?.zip?.trim() !== "" &&
              details?.state?.trim() !== "" &&
              details?.city?.trim() !== "" &&
              details?.name?.trim() !== "" &&
              Number(item?.amount) + details?.chosenAmount !=
                Number(item?.soldTokens || 0)
                ? "cursor-pointer active:scale-95"
                : "opacity-70"
            }`}
            onClick={
              !approveLoading &&
              !collectPostLoading &&
              details?.city?.trim() !== "" &&
              details?.country?.trim() !== "" &&
              details?.zip?.trim() !== "" &&
              details?.state?.trim() !== "" &&
              details?.city?.trim() !== "" &&
              details?.name?.trim() !== "" &&
              Number(item?.amount) + details?.chosenAmount !=
                Number(item?.soldTokens || 0)
                ? !address
                  ? openConnectModal
                  : !lensProfile
                  ? () => handleSignIn()
                  : !isApprovedSpend
                  ? () => approveSpend()
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
              ) : Number(item?.amount) + details?.chosenAmount ==
                Number(item?.soldTokens || 0) ? (
                t("sold")
              ) : !address ? (
                t("connect")
              ) : !lensProfile ? (
                "LENS"
              ) : !isApprovedSpend ? (
                t("app")
              ) : (
                t("coll")
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
