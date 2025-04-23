import Image from "next/image";
import { FunctionComponent, JSX, useContext } from "react";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { ModalContext } from "@/app/providers";
import { useRouter } from "next/navigation";
import { Gallery, IsekaiGalleryProps } from "../types/common.types";
import InteractBar from "./InteractBar";

const IsekaiGallery: FunctionComponent<IsekaiGalleryProps> = ({
  galleryLoading,
  dict,
  handleURL,
  filteredIsekaiGallery,
}): JSX.Element => {
  const context = useContext(ModalContext);
  const router = useRouter();
  if (
    !galleryLoading &&
    filteredIsekaiGallery?.length < 1 &&
    typeof window !== "undefined" &&
    window.location.search?.includes("portal=")
  ) {
    return (
      <div className="font-york pt-6 text-white flex items-center justify-center w-full h-40 galaxy:h-80 relative">
        {dict?.common?.mait}
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
        : (filteredIsekaiGallery?.length < 1 &&
          typeof window !== "undefined" &&
          !window.location.search?.includes("portal=")
            ? context?.filters?.portals
            : filteredIsekaiGallery
          )?.map((token: Gallery | { image: string; title: string }) => {
            return (
              <div
                key={(token as Gallery)?.postId}
                className={`h-40 galaxy:h-80 w-full border border-lightYellow relative flex items-center justify-center bg-lightYellow ${
                  filteredIsekaiGallery?.length > 0 &&
                  window.location.search?.includes("portal=") &&
                  "cursor-empireS"
                }`}
                onClick={() =>
                  filteredIsekaiGallery?.length > 0 &&
                  window.location.search?.includes("portal=")
                    ? router.push(
                        `/collect/${(
                          token as Gallery
                        )?.collectionMetadata?.title
                          ?.replaceAll(" ", "-")
                          .toLowerCase()}`
                      )
                    : handleURL(
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
                      filteredIsekaiGallery?.length > 0 &&
                      window.location.search?.includes("portal=")
                        ? (token as Gallery)?.collectionMetadata?.title
                        : (token as { image: string; title: string }).title
                    }
                    objectPosition="top"
                    src={`${INFURA_GATEWAY}/ipfs/${
                      (filteredIsekaiGallery?.length > 0 &&
                      window.location.search?.includes("portal=")
                        ? (token as Gallery)?.collectionMetadata?.images?.[0]
                        : (token as { image: string; title: string }).image
                      )?.split("ipfs://")?.[1]
                    }`}
                  />
                  {filteredIsekaiGallery?.length > 0 &&
                    window.location.search?.includes("portal=") &&
                    (token as Gallery)?.post && (
                      <InteractBar
                        dict={dict}
                        title={(token as Gallery)?.collectionMetadata?.title
                          ?.replaceAll(" ", "-")
                          .toLowerCase()}
                        post={(token as Gallery)?.post!}
                      />
                    )}
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default IsekaiGallery;
