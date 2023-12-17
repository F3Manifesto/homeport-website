import Image from "next/image";
import { FunctionComponent } from "react";
import { setImageViewer } from "../../redux/reducers/ImageLargeSlice";
import { INFURA_GATEWAY } from "../../lib/constants";
import { ImageLargeProps } from "../../types/general.types";

const ImageLarge: FunctionComponent<ImageLargeProps> = ({
  mainImage,
  dispatch,
}): JSX.Element => {
  return (
    <div className="inset-0 justify-center fixed z-30 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto">
      <div
        className="relative w-screen h-full col-start-1 justify-self-center grid grid-flow-col auto-cols-auto self-start cursor-empireS"
        onClick={() =>
          dispatch(
            setImageViewer({
              actionValue: false,
              actionImage: "",
            })
          )
        }
      >
        <div className="relative w-full h-full flex py-8 flex items-center justify-center">
          <div className="relative w-5/6 sm:w-4/5 h-4/5 justify-center flex items-center">
            <div className="relative w-full h-full row-start-1 grid grid-flow-col auto-cols-auto px-4">
              <Image
                src={mainImage}
                layout="fill"
                objectFit="contain"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLarge;
