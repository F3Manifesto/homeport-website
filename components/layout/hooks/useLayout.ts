import { useState } from "react";
import { UseLayoutResults } from "../../../types/general.types";

const useLayout = (): UseLayoutResults => {
  const [randomMicrofactory, setRandomMicrofactory] = useState<
    string
  >();
  const [clicked, setClicked] = useState<boolean>(false);
  const images: string[] = [
    "feed1",
    "feed2",
    "feed3",
    "feed4",
    "feed5",
    "feed6",
    "feed7",
    "feed8",
  ];
  const size: number = images.length;

  const random: number = Math.floor(size * Math.random());

  const randomImages = (): void => {
    setRandomMicrofactory(images[random]);
  };

  return { randomImages, randomMicrofactory, clicked, setClicked };
};

export default useLayout;
