import { useQuery } from "react-query";
import { getProducts } from "../../../../lib/helpers";

const useSelectedDrops = () => {
  const {
    isLoading,
    isError,
    data: productData,
  } = useQuery("products", getProducts);

  return { productData };
};

export default useSelectedDrops;
