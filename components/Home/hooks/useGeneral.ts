import { useEffect, useState } from "react";
import { BOARD_IMAGES } from "../../../lib/constants";

const useGeneral = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [videoImage, setVideoImage] = useState<string | undefined>();
  const [mainImages, setMainImages] = useState<string[]>(
    BOARD_IMAGES.sort(() => Math.random() - 0.5).slice(0, 5)
  );
  const [mainImage, setMainImage] = useState<string>(BOARD_IMAGES[0]);
  const messages: string[] = [
    "Did you think I wouldn't notice?",
    "Feeling better now?",
  ];
  const [message, _] = useState<string>(
    messages[Math.floor(messages.length * Math.random())]
  );

  return {
    clicked,
    setClicked,
    mainImages,
    setMainImages,
    mainImage,
    setMainImage,
    videoImage,
    setVideoImage,
    message,
  };
};

export default useGeneral;
