import Image from "next/image";
import { FunctionComponent, JSX, useContext, useEffect, useState } from "react";
import { INFURA_GATEWAY } from "../../../lib/constants";
import InteractBar from "./InteractBar";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/app/providers";
import { GalleryProps } from "../types/common.types";

const Gallery: FunctionComponent<GalleryProps> = ({
  dict,
  galleryLoading,
  filteredGallery,
}): JSX.Element => {
  const router = useRouter();
  const context = useContext(ModalContext);

  const [shouldShowShuffle, setShouldShowShuffle] = useState<boolean>(false);

  useEffect(() => {
    if (
      filteredGallery.length === 0 &&
      !galleryLoading &&
      (window?.location?.search?.includes("sex") ||
        window?.location?.search?.includes("style") ||
        window?.location?.search?.includes("collection") ||
        window?.location?.search?.includes("name"))
    ) {
      setShouldShowShuffle(true);
    } else {
      setShouldShowShuffle(false);
    }
  }, [filteredGallery, galleryLoading]);

  if (shouldShowShuffle) {
    return (
      <div className="font-york text-offBlack flex items-center justify-center w-full h-fit relative">
        {dict?.common?.shuffle}
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
            ? context?.gallery?.slice(0, 15)
            : filteredGallery
          )?.map((token) => {
            const nameToken = token?.collectionMetadata?.title
              ?.replaceAll(" ", "-")
              .toLowerCase();
            return (
              <div
                key={token?.postId}
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
                    alt={`${token?.collectionMetadata?.title} | F3Manifesto by Emma-Jane MacKinnon-Lee`}
                    objectPosition="top"
                    src={`${INFURA_GATEWAY}/ipfs/${
                      token?.collectionMetadata?.images?.[0]?.split(
                        "ipfs://"
                      )?.[1]
                    }`}
                  />
                  {token?.post && (
                    <InteractBar dict={dict} post={token?.post} title={nameToken} />
                  )}
                </div>
                <div className="h-0.5 w-full flex items-center justify-center bg-black relative"></div>
              </div>
            );
          })}
    </div>
  );
};

export default Gallery;
