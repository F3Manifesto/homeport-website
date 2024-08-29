import Image from "next/image";
import { FunctionComponent } from "react";
import { INFURA_GATEWAY } from "../../../lib/constants";
import InteractBar from "./InteractBar";
import {
  Gallery as GalleryTokens,
  IsekaiGalleryProps,
} from "../types/home.types";

const IsekaiGallery: FunctionComponent<IsekaiGalleryProps> = ({
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
  t,
  isekaiDrops,
  filterURL,
}): JSX.Element => {
  if (
    !galleryLoading &&
    filteredGallery?.length < 1 &&
    window.location.search?.includes("portal=")
  ) {
    return (
      <div className="font-york pt-6 text-white flex items-center justify-center w-full h-40 galaxy:h-80 relative">
        {t("mait")}
      </div>
    );
  }
  return (
    <div className="relative w-full pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-fit grid-flow-row gap-4 items-center">
      {galleryLoading
        ? Array.from({ length: 3 })?.map((_, index: number) => {
            return (
              <div
                key={index}
                className={`h-40 galaxy:h-80 w-full border border-lightYellow relative flex items-center justify-center bg-lightYellow animate-pulse`}
              ></div>
            );
          })
        : (filteredGallery?.length < 1 &&
          !window.location.search?.includes("portal=")
            ? isekaiDrops
            : filteredGallery
          )?.map(
            (
              token: GalleryTokens | { image: string; title: string },
              index: number
            ) => {
              return (
                <div
                  key={(token as GalleryTokens)?.pubId}
                  className={`h-40 galaxy:h-80 w-full border border-lightYellow relative flex items-center justify-center bg-lightYellow ${
                    filteredGallery?.length > 0 &&
                    window.location.search?.includes("portal=") &&
                    "cursor-empireS"
                  }`}
                  onClick={() =>
                    filteredGallery?.length > 0 &&
                    window.location.search?.includes("portal=")
                      ? router.push(
                          `/collect/${(
                            token as GalleryTokens
                          )?.collectionMetadata?.title
                            ?.replaceAll(" ", "-")
                            .toLowerCase()}`
                        )
                      : filterURL(
                          "portal",
                          (
                            token as { image: string; title: string }
                          )?.title?.split("- ")?.[1]
                        )
                  }
                >
                  <div
                    className={`w-full h-full flex items-center justify-center relative`}
                  >
                    <Image
                      priority
                      objectFit="cover"
                      layout="fill"
                      draggable={false}
                      alt={
                        filteredGallery?.length > 0 &&
                        window.location.search?.includes("portal=")
                          ? (token as GalleryTokens)?.collectionMetadata?.title
                          : (token as { image: string; title: string }).title
                      }
                      objectPosition="top"
                      src={`${INFURA_GATEWAY}/ipfs/${
                        (filteredGallery?.length > 0 &&
                        window.location.search?.includes("portal=")
                          ? (token as GalleryTokens)?.collectionMetadata
                              ?.images?.[0]
                          : (token as { image: string; title: string }).image
                        )?.split("ipfs://")?.[1]
                      }`}
                    />
                    {filteredGallery?.length > 0 &&
                      window.location.search?.includes("portal=") && (
                        <InteractBar
                          token={token as GalleryTokens}
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
                          isekai={true}
                        />
                      )}
                  </div>
                </div>
              );
            }
          )}
    </div>
  );
};

export default IsekaiGallery;
