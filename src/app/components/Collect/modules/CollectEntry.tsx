"use client";

import Image from "next/image";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import { ModalContext } from "@/app/providers";
import RouterChange from "../../Common/modules/RouterChange";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AiFillBackward } from "react-icons/ai";
import useCollection from "../hooks/useCollection";
import Connect from "./Connect";
import Metadata from "./Metadata";
import References from "./References";
import { Gallery } from "../../Common/types/common.types";

export default function CollectEntry({
  dict,
  collection,
}: {
  dict: any;
  collection: Gallery;
}) {
  const context = useContext(ModalContext);
  const router = useRouter();
  const { indice, setIndice, post, postLoading } = useCollection(collection);

  // if (collection && post && !postLoading) {
    return (
      <div className="flex h-full min-h-screen w-full relative cursor-empire selection:bg-lightYellow selection:text-lightYellow bg-gradient-to-b from-lightY via-white to-lightPurple items-start justify-center">
        <div className="w-full h-full flex flex-col relative items-center justify-start">
          <div className="relative w-full h-fit flex flex-row justify-between gap-4 items-center py-8 px-4 sm:flex-nowrap flex-wrap">
            <div
              onClick={() => router.back()}
              className="relative w-fit h-fit flex mr-auto text-offBlack font-fira opacity-80 hover:opacity-20 cursor-empireS flex-row gap-2"
            >
              <AiFillBackward
                color="#131313"
                size={25}
                className="float-left mr-2"
              />
              <div className="relative w-fit h-fit flex items-center justify-center">
                {dict?.collect?.return}
              </div>
            </div>
            <div className="w-fit h-fit ml-auto flex items-center justify-center hover:text-offBlue underline underline-offset-4 h-fit relative">
              <Connect dict={dict} />
            </div>
          </div>
          <div className="relative w-full h-fit flex border-t-4 border-lightWhite px-4 py-7">
            <h1 className="relative flex items-center justify-start font-jacklane text-4xl sm:text-7xl">
              {collection?.metadata?.title?.toUpperCase()}
            </h1>
          </div>
          <div className="relative w-full h-full flex bg-foot py-8 border-y-8 border-lightWhite flex items-center justify-center p-2">
            <div className="relative w-full h-[120vw] sm:h-[90vw] md:[80vw] lg:h-[50vw] bg-lightWhite flex items-center justify-center p-3">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  priority
                  layout="fill"
                  objectFit="contain"
                  alt={`${collection?.metadata?.title} by F3M | Emma-Jane MacKinnon-Lee`}
                  draggable={false}
                  src={`${INFURA_GATEWAY_INTERNAL}${
                    collection?.metadata?.images?.[indice]?.split(
                      "ipfs://"
                    )?.[1]
                  }`}
                  key={indice}
                  onClick={() =>
                    context?.setImageViewer(
                      `${INFURA_GATEWAY_INTERNAL}${
                        collection?.metadata?.images?.[indice]?.split(
                          "ipfs://"
                        )?.[1]
                      }`
                    )
                  }
                />
                {(collection?.metadata?.images || [])?.length > 1 && (
                  <div className="absolute z-10 top-3 right-3 flex items-center justify-center flex-row gap-2">
                    <div
                      className="relative w-fit h-fit flex items-center justify-center active:scale-95 cursor-empireS"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIndice(
                          indice - 1 < 0
                            ? (collection?.metadata?.images || [])
                                ?.length - 1
                            : indice - 1
                        );
                      }}
                    >
                      <div className="relative w-4 h-6 flex items-center justify-center rotate-180">
                        <Image
                          src={`${INFURA_GATEWAY_INTERNAL}QmaercaFRN5CogxWiB5TVdDMG42XY2Uf7MD5zHfQgJKEWQ`}
                          layout="fill"
                          alt="Arrow"
                          priority
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div
                      className="relative w-fit h-fit flex items-center justify-center active:scale-95 cursor-empireS"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIndice(
                          indice + 1 >
                            (collection?.metadata?.images || [])
                              ?.length -
                              1
                            ? 0
                            : indice + 1
                        );
                      }}
                    >
                      <div className="relative  w-4 h-6 flex items-center justify-center">
                        <Image
                          src={`${INFURA_GATEWAY_INTERNAL}QmaercaFRN5CogxWiB5TVdDMG42XY2Uf7MD5zHfQgJKEWQ`}
                          layout="fill"
                          alt="Arrow"
                          priority
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="relative w-full h-full flex flex-col gap-3 items-center justify-center pt-10 pb-24 cursor-empireA px-5">
            <Metadata post={post} item={collection!} dict={dict} />
            <div className="relative w-full h-fit flex flex-col lg:flex-row gap-2 justify-start items-start">
              <References post={post} dict={dict} />
            </div>
          </div>
        </div>
      </div>
    );
  // }

  // return <RouterChange />;
}
