import Image from "next/legacy/image";
import { FunctionComponent } from "react";
import useImageSlider from "./hooks/useImageSlider";
import { RiArrowRightSFill } from "react-icons/ri";

const ImageSlider: FunctionComponent = (): JSX.Element => {
  const { nextImage, imageIndex, imageList, featuredImage, setFeaturedImage } =
    useImageSlider();
  return (
    <div className="relative w-full h-full row-start-1 grid grid-flow-row auto-rows-[auto auto] gap-16">
      <div className="relative w-full h-[35rem] row-start-1">
        <Image
          src={`/images/${featuredImage}.png`}
          objectFit={"cover"}
          alt="featured"
          layout="fill"
        />
      </div>
      <div className="relative w-full h-fit row-start-2 grid grid-flow-col auto-cols-[auto auto]">
        <div
          className="relative w-60 h-60 col-start-1 place-self-start grid grid-flow-col auto-cols-[auto auto] cursor-pointer hover:opacity-70"
          onClick={() => setFeaturedImage(imageList[imageIndex])}
        >
          <Image
            src={`/images/${imageList[imageIndex]}.png`}
            alt="featured"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div
          className="relative w-full h-full col-start-2 grid grid-flow-col auto-cols-[auto auto] border-2 border-lBlue rounded-lg cursor-pointer hover:opacity-70"
          onClick={() => nextImage()}
        >
          <div className="relative w-fit h-fit col-start-1 place-self-center">
            <RiArrowRightSFill color="#3C84F0" size={80} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
