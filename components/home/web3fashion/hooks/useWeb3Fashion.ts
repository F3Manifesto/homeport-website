import { useState } from "react";
import {
  marqueeVariants,
  useWeb3FashionResults,
} from "./../../../../types/general.types";

const useWeb3Fashion = (): useWeb3FashionResults => {
  const marqueeVariants: marqueeVariants = {
    animate: {
      x: [-100, 100],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 5,
          ease: "linear",
        },
      },
    },
  };
  const [showImage, setShowImage] = useState<string | undefined>()

  return { marqueeVariants, setShowImage, showImage};
};

export default useWeb3Fashion;
