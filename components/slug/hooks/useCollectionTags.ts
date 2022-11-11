import { useState, useMemo, useEffect } from "react";
import { UseCollectionTagsResult } from "../../../types/general.types";
import arrayShuffle from "array-shuffle";

const useCollectionTags = (): UseCollectionTagsResult => {
  const [bgColor, setBgColor] = useState<number>(0);
  const [showFormats, setShowFormats] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const formats: string[] = [
    "sticker pack",
    "poster",
    "t-shirt",
    "record cover",
    "tote bag",
  ];

  const categories: string[] = [
    "concept art",
    "visual fiction",
    "nostalgia",
    "abstract",
  ];

  const randomColor: string[] = [
    "purpleTheme",
    "blueTheme",
    "yellowTheme",
    "orangeTheme",
  ];

  useEffect(() => {
    const numbersArray: number[] = arrayShuffle([0, 1, 2, 3]);
    setBgColor(numbersArray[0]);
    console.log(numbersArray);
  }, [bgColor]);

  return {
    formats,
    categories,
    randomColor,
    bgColor,
    showFormats,
    setShowFormats,
    showCategories,
    setShowCategories,
  };
};

export default useCollectionTags;
