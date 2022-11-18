import Image from "next/legacy/image";
import { FunctionComponent } from "react";
import useGallery from "./hooks/useGallery";
import lodash from "lodash";
import { ProductInterface } from "../../types/general.types";
import Link from "next/link";
import { BASE_URL } from "../../lib/constants";

const Gallery: FunctionComponent = (): JSX.Element => {
  const { gallery, extend, setExtend } = useGallery();
  return (
    <div className="relative row-start-3 w-full h-full grid grid-flow-row auto-rows-[auto auto]">
      <div className="relative w-fit h-fit row-start-1 grid grid-cols-3 auto-rows-auto gap-10 place-self-center pt-10">
        {(extend ? gallery : lodash.slice(gallery, 0, 9)).map(
          (product: ProductInterface, index: number) => {
            return (
              <div
                key={index}
                className="relative w-72 h-72 bg-grayBlue rounded-md font-economica text-lg grid grid-flow-col auto-cols-[auto auto] group cursor-pointer"
              >
                <img
                  src={`https://${product?.mainImage}.ipfs.w3s.link`}
                  className="absolute w-full h-full object-cover"
                />
                {
                  <Link href={`${BASE_URL}/items/${product?.slug}`}>
                    <div className="absolute group-hover:visible invisible bg-black w-full h-full bg-opacity-80 grid grid-flow-col auto-cols-[auto auto]">
                      <div className="col-start-1 relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-5 place-self-center">
                        <div className="relative text-white w-fit h-fit col-start-1 place-self-center">
                          {product?.name}
                        </div>
                      </div>
                    </div>
                  </Link>
                }
              </div>
            );
          }
        )}
      </div>
      <div className="relative w-full h-fit row-start-2 grid grid-flow-col auto-cols-[auto auto] py-6">
        <div
          className="relative w-fit h-fit border-2 px-3 py-1.5 border-white grid grid-flow-col auto-cols-[auto auto] rounded-lg place-self-center cursor-pointer hover:opacity-70 active:scale-95"
          onClick={() => setExtend(!extend)}
        >
          <div className="relative w-fit h-fit text-white font-animosaL place-self-center ">
            EXTEND THE DROP
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
