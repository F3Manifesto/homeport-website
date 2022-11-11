import Image from "next/legacy/image";
import { FunctionComponent } from "react";
import useGallery from "./hooks/useGallery";
import lodash from "lodash";

const Gallery: FunctionComponent = (): JSX.Element => {
  const { gallery, extend, setExtend } = useGallery();
  return (
    <div className="relative row-start-3 w-full h-full grid grid-flow-row auto-rows-[auto auto]">
      <div className="relative w-fit h-fit row-start-1 grid grid-cols-3 auto-rows-auto gap-10 place-self-center pt-10">
        {(extend ? gallery : lodash.slice(gallery, 0, 9)).map(
          (image: string, index: number) => {
            return (
              <div
                key={index}
                className="relative w-72 h-72 bg-grayBlue rounded-md"
              >
                <Image
                  src={`/images/gallery/${image}.png`}
                  layout="fill"
                  objectFit="cover"
                />
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
