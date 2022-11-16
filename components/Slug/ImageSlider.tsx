import { FunctionComponent } from "react";
import useImageSlider from "./hooks/useImageSlider";
import { RiArrowRightSFill } from "react-icons/ri";
import { ImageSliderProps } from "../../types/general.types";

const ImageSlider: FunctionComponent<ImageSliderProps> = ({
  item,
}): JSX.Element => {
  const { nextImage, imageIndex, imageList, featuredImage, setFeaturedImage } =
    useImageSlider();
  return (
    <div className="relative w-full h-full row-start-1 grid grid-flow-row auto-rows-[auto auto] gap-16">
      <div className="relative w-full h-[35rem] row-start-1">
        <img
          src={`https://${featuredImage}.ipfs.w3s.link`}
          alt="featured"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative w-full h-fit row-start-2 grid grid-flow-col auto-cols-[auto auto]">
        <img
          src={`https://${imageList[imageIndex]}.ipfs.w3s.link`}
          alt="featured"
          className="relative w-60 h-60 col-start-1 place-self-start grid grid-flow-col auto-cols-[auto auto] cursor-pointer hover:opacity-70 object-cover"
          onClick={() =>
            setFeaturedImage((item.featuredImages as string[])[imageIndex])
          }
        />
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
