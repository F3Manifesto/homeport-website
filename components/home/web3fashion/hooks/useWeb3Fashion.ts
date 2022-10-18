import { useState } from "react";
import {
  marqueeVariants,
  shoppingAnimate,
  useWeb3FashionResults,
} from "./../../../../types/general.types";
import { useMediaQuery } from "@material-ui/core";

const useWeb3Fashion = (): useWeb3FashionResults => {
  let queryWindowSize: boolean = useMediaQuery("(max-width:640px)");
  let queryWindowSizeMobile: boolean = useMediaQuery("(max-width:480px)");
  let animate: shoppingAnimate;

  if (queryWindowSizeMobile && queryWindowSize) {
    animate = {
      x: [-650, 650],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    };
  } else if (queryWindowSize && !queryWindowSizeMobile) {
    animate = {
      x: [-485, 485],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    };
  } else {
    animate = {
      x: [-100, 100],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 5,
          ease: "linear",
        },
      },
    };
  }

  const marqueeVariants: marqueeVariants = {
    animate: animate,
  };
  const [showImage, setShowImage] = useState<string | undefined>();

  return { marqueeVariants, setShowImage, showImage };
};

export default useWeb3Fashion;
