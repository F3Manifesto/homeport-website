import { useState } from "react";
import { UseF3ManifestoResults } from "../../../../types/general.types";
import shuffle from "shuffle-array";

const useF3Manifesto = (): UseF3ManifestoResults => {
  const [newImages, setNewImages] = useState<string[] | undefined>([
    "main1",
    "main2",
    "main3",
    "main4",
    "main12",
  ]);
  const [mainImage, setMainImage] = useState<string>("14");
  const images: string[] = [
    "main1",
    "main2",
    "main3",
    "main4",
    "main5",
    "main6",
    "main7",
    "main8",
    "main9",
    "main10",
    "main11",
    "main12",
    "main13",
    "main14",
    "main15",
    "main16",
    "main17",
    "main18",
  ];

  const refreshImages = (): void => {
    let newImages: string[] = [];
    shuffle<string>(images);
    for (let i = 0; i < 5; i++) {
      newImages.push(images[i]);
    }
    setNewImages(newImages);
  };

  const viewMainImage = (e: any): void => {
    let src: string = e.target.srcset;
    if (src.split("main")[1].charAt(1) === ".") {
      src = src.split("main")[1].charAt(0);
    } else {
      src = src.split("main")[1].charAt(0) + src.split("main")[1].charAt(1);
    }
    setMainImage(src);
  };

  return { refreshImages, viewMainImage, newImages, mainImage };
};

export default useF3Manifesto;
