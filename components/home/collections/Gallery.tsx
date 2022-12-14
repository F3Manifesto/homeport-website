import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useContext, useState } from "react";
import { GlobalContext } from "../../../pages/_app";
import { Gallery, GalleryProps } from "./../../../types/general.types";

const Gallery: FunctionComponent<GalleryProps> = ({
  gallery,
  setOrder,
}): JSX.Element => {
  const [blur, setBlur] = useState<boolean>(true);
  const { setClickedFromMain } = useContext(GlobalContext);

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
          const nameToken = token.name.replaceAll(" ", "-").toLowerCase();
          return (
            <div
              key={key}
              className="h-80 w-full bg-lightYellow min-h-max relative ml-0 mt-0 m-4"
            >
              <div
                className={`w-full h-full ${blur && "blur-sm animate-unblur"}`}
              >
                <Image
                  priority
                  objectFit="cover"
                  layout="fill"
                  alt={token.name}
                  objectPosition="top"
                  style={blur ? { opacity: 0 } : { opacity: 1 }}
                  // src={token.image}
                  src={`https://f3manifesto.infura-ipfs.io/ipfs/${token.image}`}
                  onLoadingComplete={() => setBlur(false)}
                />
              </div>
              <div className="absolute bottom-4 font-din left-3 inline-flex">
                <Link href={`/collect/${nameToken}`}>
                  <a>
                    <button
                      className="rounded-full bg-offWhite relative w-fit h-fit mr-2  table-cell text-xl p-2 border-offBlack border-2 cursor-empireS active:opacity-80"
                      onClick={() => {
                        setOrder(token.name);
                        setClickedFromMain(true);
                      }}
                    >
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
                      onClick={() => setOrder(token.name)}
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
