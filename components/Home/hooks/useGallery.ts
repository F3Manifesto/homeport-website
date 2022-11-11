import { useState } from "react";
import { UseGalleryResult } from "../../../types/general.types";

const useGallery = (): UseGalleryResult => {
    const [extend, setExtend] = useState<boolean>(false)
  const gallery: string[] = [
    "gallery1",
    "gallery2",
    "gallery3",
    "gallery4",
    "gallery5",
    "gallery6",
    "gallery7",
    "gallery8",
    "gallery9",    
    "gallery10",
    "gallery11",
    "gallery12",
  ];

  return { gallery, extend, setExtend};
};

export default useGallery;
