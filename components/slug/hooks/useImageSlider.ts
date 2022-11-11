import { useState } from "react";
import { UseImageSliderResult } from "../../../types/general.types";

const useImageSlider = (): UseImageSliderResult => {
  const imageList: string[] = ["extra", "shoes"];
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [featuredImage, setFeaturedImage] = useState<string>("extra");

  const nextImage = (): void => {
    if (imageIndex === imageList.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  return { nextImage, imageList, imageIndex, featuredImage, setFeaturedImage };
};

export default useImageSlider;
