import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useContext, useState } from "react";
import { GlobalContext } from "../../../pages/_app";
import { Gallery, GalleryProps } from "./../../../types/general.types";

const Gallery: FunctionComponent<GalleryProps> = ({ gallery }): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);
  const { setOrderIRL } = useContext(GlobalContext);
  if (gallery.length === 0) {
    return (
      <div className="font-york text-offBlue flex items-center justify-center w-full h-fit">
        Reshuffle to Find A Look.
      </div>
    );
  }
  return (
    <div className="relative min-h-max h-max w-full flex">
      <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-max grid-flow-row gap-4 items-center mb-10">
        {gallery?.map((token: Gallery, key: number) => {
          return (
            <div
              key={key}
              className="h-80 w-full min-h-max relative ml-0 mt-0 m-4"
            >
              <div
                className={`w-full h-full ${blur && "blur-sm animate-unblur"}`}
              >
                <Image
                  priority
                  placeholder="blur"
                  blurDataURL={token.blurred}
                  objectFit="cover"
                  layout="fill"
                  objectPosition="top"
                  src={token.image}
                  onLoadingComplete={() => setBlur(false)}
                />
              </div>
              <div className="absolute bottom-4 font-din left-3 inline-flex">
                <Link href={token.link}>
                  <a target="_blank" rel="noreferrer">
                    <button className="rounded-full bg-offWhite relative w-fit h-fit mr-2  table-cell text-xl p-2 border-offBlack border-2 cursor-empireS active:opacity-80">
                      <p className="leading-none text-center align-middle relative h-full w-full top-1 text-offBlack">
                        COLLECT NFT
                      </p>
                    </button>
                  </a>
                </Link>
                <Link href={"/pre-order"}>
                  <a>
                    <button
                      className="rounded-full bg-offBlack relative w-fit h-fit mr-2  table-cell text-xl p-2 border-offWhite border-2 cursor-empireS active:opacity-80"
                      name={token.name}
                      onClick={(e: any) => setOrderIRL(e.target.name)}
                    >
                      <p className="leading-none text-center align-middle relative h-full w-full top-1 text-offWhite">
                        PRE-ORDER IRL
                      </p>
                    </button>
                  </a>
                </Link>
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
