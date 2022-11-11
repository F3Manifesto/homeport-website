import { useEffect, useState } from "react";
import { UseFeaturedResult } from "../../../types/general.types";
import arrayShuffle from "array-shuffle";

const useFeatured = (): UseFeaturedResult => {
  const [formatColors, setFormatColors] = useState<string[]>([])
  const [typeColors, setTypeColors] = useState<string[]>([])
  const dropType: string[] = [
    "Patterns",
    "Concept Art",
    "Glyphs",
    "Free Expression",
    "Abstract",
    "Visual Fiction",
    "Retro Instructional",
    "Nostalgia",
    "Lo - Fi Moods",
    "New & Daring",
    "Boutique IRL",
  ];

  const dropFormat: string[] = [
    "Poster",
    "Shirt",
    "Glyphs",
    "Hoodie",
    "Sticker Pack",
    "Backpack",
    "Shoes",
    "Jacket",
    "Tote Bag",
    "Art Canvas",
    "Game Assets",
    "Record Cover",
    "Zine",
  ];

  const randomColor: string[] = [
    "#CFB0FA",
    "#FA6400",
    "#0091FF",
    "#FBDB86",
    "#81A8F8",
  ];

  useEffect(() => {
    let formatColorsArray: string[] = []
    let typeColorsArray: string[] = []
    for (let i = 0; i < dropFormat.length; i++) {
      const numbersArray: number[] = arrayShuffle([0, 1, 2, 3, 4]);
      formatColorsArray.push(randomColor[numbersArray[0]])
    }
    for (let i = 0; i < dropType.length; i++) {
      const numbersArray: number[] = arrayShuffle([0, 1, 2, 3, 4]);
      typeColorsArray.push(randomColor[numbersArray[0]])
    }
    setFormatColors(formatColorsArray)
    setTypeColors(typeColorsArray)
  }, [])

  return { dropType, dropFormat, formatColors, typeColors };
};

export default useFeatured;
