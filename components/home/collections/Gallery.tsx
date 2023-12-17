import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { Gallery, GalleryProps } from "./../../../types/general.types";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { AiOutlineLoading } from "react-icons/ai";
import { Post } from "../../../graphql/generated";
import { setLensConnectModal } from "../../../redux/reducers/lensConnectModalSlice";

const Gallery: FunctionComponent<GalleryProps> = ({
  gallery,
  router,
  filteredGallery,
  galleryLoading,
  interactionLoaders,
  mirror,
  like,
  quote,
  connected,
  lensConnected,
  openConnectModal,
  dispatch,
}): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);
  if (
    filteredGallery.length === 0 &&
    !galleryLoading &&
    (router.asPath?.includes("sex") ||
      router.asPath?.includes("style") ||
      router.asPath?.includes("collection") ||
      router.asPath?.includes("name"))
  ) {
    return (
      <div className="font-york text-offBlue flex items-center justify-center w-full h-fit">
        Reshuffle to Find A Look.
      </div>
    );
  }
  return (
    <div className="relative min-h-max h-max w-full flex">
      <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-max grid-flow-row gap-4 items-center mb-10">
        {galleryLoading
          ? Array.from({ length: 9 })?.map((_, index: number) => {
              return (
                <div
                  key={index}
                  className="h-80 w-full bg-lightYellow min-h-max relative ml-0 mt-0 m-4 animate-pulse"
                >
                  <div className={`w-full h-full`}></div>
                  <hr className="h-0.5 bg-black top-4 relative" />
                </div>
              );
            })
          : (filteredGallery?.length < 1
              ? gallery?.slice(0, 9)
              : filteredGallery
            )?.map((token: Gallery, index: number) => {
              const nameToken = token?.collectionMetadata?.title
                ?.replaceAll(" ", "-")
                .toLowerCase();
              return (
                <div
                  key={token?.pubId}
                  className="h-80 w-full bg-lightYellow min-h-max relative ml-0 mt-0 m-4 cursor-empireS"
                  onClick={() => router.push(`/collect/${nameToken}`)}
                >
                  <div
                    className={`w-full h-full ${
                      blur && "blur-sm animate-unblur"
                    }`}
                  >
                    <Image
                      priority
                      objectFit="cover"
                      layout="fill"
                      draggable={false}
                      alt={token?.collectionMetadata?.title}
                      objectPosition="top"
                      style={blur ? { opacity: 0 } : { opacity: 1 }}
                      // src={token.image}
                      src={`${INFURA_GATEWAY}/ipfs/${
                        token?.collectionMetadata?.images?.[0]?.split(
                          "ipfs://"
                        )?.[1]
                      }`}
                      onLoadingComplete={() => setBlur(false)}
                    />
                  </div>
                  <div
                    className="absolute w-fit py-1 px-2 left-2 bottom-2 border border-black bg-white/70 flex flex-row gap-3 z-2 cursor-default"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {[
                      {
                        count: token?.publication?.stats?.reactions || 0,
                        image: "QmV2VzKD9NMX1CzqcwFhzwzASpPrxZYAVfZkUPiXid2TmC",
                        function: () =>
                          like(
                            token?.publication?.id,
                            token?.publication?.operations?.hasReacted!,
                            index
                          ),
                        loader: interactionLoaders?.[index]?.like,
                        name: "Like",
                        reacted: token?.publication?.operations?.hasReacted!,
                      },
                      {
                        count: token?.publication?.stats?.mirrors || 0,
                        image: "QmQbWFsaUvQKbDpTyXesJKJM975qUEn5ncx3Mg3fs2wMZo",
                        function: () => mirror(token?.publication?.id, index),
                        loader: interactionLoaders?.[index]?.mirror,
                        name: "Mirror",
                        reacted: token?.publication?.operations?.hasMirrored!,
                      },
                      {
                        count: token?.publication?.stats?.quotes || 0,
                        image: "QmWDazvMf6mLejU1QoTmMejc8jXWpiaYgd2qzXsnzAQ8ei",
                        function: () => quote(token?.publication as Post),
                        loader: false,
                        name: "Quote",
                        reacted: token?.publication?.operations?.hasQuoted!,
                      },
                      {
                        count: token?.publication?.stats?.comments || 0,
                        image: "QmeHH3LN6NMgZAEFFYyN4f3z8xPHs4DHzhytjRHNBcHTza",
                        function: () => router.push(`/collect/${nameToken}`),
                        loader: false,
                        name: "Comment",
                        reacted: false,
                      },
                      {
                        count: token?.publication?.stats?.countOpenActions || 0,
                        image: "Qmde7MbuTdD4MvH9Uvns5dCiAYUxDhvAFhmKYFy6wJTMg6",
                        function: () => router.push(`/collect/${nameToken}`),
                        loader: false,
                        name: "Collect",
                        reacted:
                          token?.publication?.operations?.hasActed
                            ?.isFinalisedOnchain!,
                      },
                    ].map(
                      (
                        item: {
                          image: string;
                          count: number;
                          function: () => void;
                          loader: boolean;
                          name: string;
                          reacted: boolean;
                        },
                        key: number
                      ) => {
                        return (
                          <div
                            key={key}
                            className="relative w-fit h-fit flex items-center cursor-pointer justify-center flex flex-row gap-2"
                            title={item.name}
                          >
                            <div
                              className={`relative w-4 h-4 flex items-center justify-center ${
                                item?.reacted &&
                                "mix-blend-multiply hue-rotate-60"
                              }`}
                              onClick={
                                !connected
                                  ? openConnectModal
                                  : connected && !lensConnected?.id
                                  ? (e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      dispatch(setLensConnectModal(true));
                                    }
                                  : (e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      if (!item.loader) item.function();
                                    }
                              }
                            >
                              {item?.loader ? (
                                <div className="flex items-center justify-center animate-spin">
                                  <AiOutlineLoading color="black" size={12} />
                                </div>
                              ) : (
                                <Image
                                  layout="fill"
                                  src={`${INFURA_GATEWAY}/ipfs/${item?.image}`}
                                  draggable={false}
                                />
                              )}
                            </div>
                            <div className="relative w-fit h-fit flex items-center justify-center text-black font-din text-xxs">
                              {item?.count}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <hr className="h-0.5 bg-black top-4 relative" />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Gallery;
