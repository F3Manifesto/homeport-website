import { useState } from "react";
import { UseGalleryResult } from "../../../types/general.types";
import { useQuery } from "react-query";
import { getProducts } from "../../../lib/helpers";

const useGallery = (): UseGalleryResult => {
  const [extend, setExtend] = useState<boolean>(false);
  const {
    isLoading,
    isError,
    data: gallery,
  } = useQuery("products", getProducts);

  return { gallery, extend, setExtend };
};

export default useGallery;
