import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { Gallery, GalleryProps } from "./../../../types/general.types";
import { INFURA_GATEWAY } from "../../../lib/constants";
import InteractBar from "../../modals/modules/InteractBar";

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
}): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);
  if (
    filteredGallery.length === 0 &&
    !galleryLoading &&
    (window.location.search?.includes("sex") ||
      window.location.search?.includes("style") ||
      window.location.search?.includes("collection") ||
      window.location.search?.includes("name"))
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
                  <hr className="h-0.5 bg-black top-4 relative" />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Gallery;
