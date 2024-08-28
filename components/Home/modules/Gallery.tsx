import Image from "next/image";
import { FunctionComponent } from "react";
import { INFURA_GATEWAY } from "../../../lib/constants";
import InteractBar from "./InteractBar";
import { Gallery as GalleryTokens, GalleryProps } from "../types/home.types";

const Gallery: FunctionComponent<GalleryProps> = ({
  gallery,
  router,
  filteredGallery,
  galleryLoading,
  interactionLoaders,
  mirror,
  like,
  connected,
  lensConnected,
  openConnectModal,
  dispatch,
  t
}): JSX.Element => {
  if (
    filteredGallery.length === 0 &&
    !galleryLoading &&
    (window.location.search?.includes("sex") ||
      window.location.search?.includes("style") ||
      window.location.search?.includes("collection") ||
      window.location.search?.includes("name"))
  ) {
    return (
      <div className="font-york text-offBlack flex items-center justify-center w-full h-fit relative">
        {t("shuffle")}
      </div>
    );
  }
  return (
    <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-fit grid-flow-row gap-4 items-center">
      {galleryLoading
        ? Array.from({ length: 15 })?.map((_, index: number) => {
            return (
              <div
                key={index}
                className="h-80 w-full flex items-center justify-center relative animate-pulse gap-4 flex-col"
              >
                <div className="w-full h-full flex items-center justify-center bg-lightYellow relative"></div>
                <div className="h-0.5 w-full flex items-center justify-center bg-black relative"></div>
              </div>
            );
          })
        : (filteredGallery?.length < 1
            ? gallery?.slice(0, 15)
            : filteredGallery
          )?.map((token: GalleryTokens, index: number) => {
            const nameToken = token?.collectionMetadata?.title
              ?.replaceAll(" ", "-")
              .toLowerCase();
            return (
              <div
                key={token?.pubId}
                className="h-80 w-full flex items-center justify-center relative cursor-empireS gap-4 flex-col"
                onClick={() => router.push(`/collect/${nameToken}`)}
              >
                <div
                  className={`w-full h-full flex items-center justify-center relative`}
                >
                  <Image
                    priority
                    objectFit="cover"
                    layout="fill"
                    draggable={false}
                    alt={token?.collectionMetadata?.title}
                    objectPosition="top"
                    src={`${INFURA_GATEWAY}/ipfs/${
                      token?.collectionMetadata?.images?.[0]?.split(
                        "ipfs://"
                      )?.[1]
                    }`}
                  />
                  <InteractBar
                    token={token}
                    like={like}
                    dispatch={dispatch}
                    mirror={mirror}
                    router={router}
                    index={index}
                    interactionLoaders={interactionLoaders}
                    connected={connected}
                    lensConnected={lensConnected}
                    openConnectModal={openConnectModal}
                    left="0.5rem"
                    bottom="0.5rem"
                    absolute
                    main={false}
                  />
                </div>
                <div className="h-0.5 w-full flex items-center justify-center bg-black relative"></div>
              </div>
            );
          })}
    </div>
  );
};

export default Gallery;
