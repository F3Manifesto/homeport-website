import { useQuery } from "react-query";
import { getAddresses } from "../../../../lib/helpers";

const useSelectedDrops = () => {
  const {
    isLoading,
    isError,
    data: addressData,
  } = useQuery("addresses", getAddresses);

  return { addressData };
};

export default useSelectedDrops;
