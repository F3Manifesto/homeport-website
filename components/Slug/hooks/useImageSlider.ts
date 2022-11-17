import { useState } from "react";
import { UseImageSliderResult } from "../../../types/general.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const useImageSlider = (): UseImageSliderResult => {
  const mainImage = useSelector(
    (state: RootState) => state.app.mainImageReducer.value
  );
  const featuredImages = useSelector(
    (state: RootState) => state.app.featuredImagesReducer.value
  );
  console.log(mainImage)
  const imageList: string[] = featuredImages as string[];
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [featuredImage, setFeaturedImage] = useState<string>(
    mainImage as string
  );
  const nextImage = (): void => {
    if (imageIndex === imageList?.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  return { nextImage, imageList, imageIndex, featuredImage, setFeaturedImage };
};

export default useImageSlider;
