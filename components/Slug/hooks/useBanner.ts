import { useState } from "react";
import { UseBannerResult } from "../../../types/general.types";

const useBanner = (): UseBannerResult  => {
  const imageList: string[] = ["extra", "banner"];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  return {
    imageList,
    currentIndex,
    setCurrentIndex,
    direction,
    setDirection,
  };
};

export default useBanner;
