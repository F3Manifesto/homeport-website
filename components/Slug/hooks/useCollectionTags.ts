import { useState, useEffect } from "react";
import { UseCollectionTagsResult } from "../../../types/general.types";
import arrayShuffle from "array-shuffle";

const useCollectionTags = (): UseCollectionTagsResult => {
  const [formatColors, setFormatColors] = useState<string[]>([])
  const [categoryColors, setCategoryColors] = useState<string[]>([])
  const [showFormats, setShowFormats] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);

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
    let colorsArrayFormats: string[] = []
    let colorsArrayCategories: string[] = []
    for (let i = 0; i < categories?.length; i++) {
      const numbersArray: number[] = arrayShuffle([0, 1, 2, 3]);
      colorsArrayCategories.push(randomColor[numbersArray[0]])
    }
    setFormatColors(colorsArrayFormats)
    setCategoryColors(colorsArrayCategories)
  }, [])

  return {
    categories,
    categoryColors,
    formatColors,
    showFormats,
    setShowFormats,
    showCategories,
    setShowCategories,
  };
};

export default useCollectionTags;
