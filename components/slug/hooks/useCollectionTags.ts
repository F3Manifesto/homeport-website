import { useState, useEffect } from "react";
import { UseCollectionTagsResult } from "../../../types/general.types";
import arrayShuffle from "array-shuffle";

const useCollectionTags = (): UseCollectionTagsResult => {
  const [formatColors, setFormatColors] = useState<string[]>([])
  const [categoryColors, setCategoryColors] = useState<string[]>([])
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
    let colorsArrayFormats: string[] = []
    let colorsArrayCategories: string[] = []
    for (let i = 0; i < formats.length; i++) {
      const numbersArray: number[] = arrayShuffle([0, 1, 2, 3]);
      colorsArrayFormats.push(randomColor[numbersArray[0]])
    }
    for (let i = 0; i < categories.length; i++) {
      const numbersArray: number[] = arrayShuffle([0, 1, 2, 3]);
      colorsArrayCategories.push(randomColor[numbersArray[0]])
    }
    setFormatColors(colorsArrayFormats)
    setCategoryColors(colorsArrayCategories)
  }, [])

  return {
    formats,
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
