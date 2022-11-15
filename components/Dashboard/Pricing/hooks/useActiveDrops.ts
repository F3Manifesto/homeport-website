import { useQuery } from "react-query";
import { getDropTypes } from "../../../../lib/helpers";

const useActiveDrops = () => {
  const { isLoading, isError, data } = useQuery("dropTypes", getDropTypes);

  return { data };
};

export default useActiveDrops;
