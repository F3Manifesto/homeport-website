import { useQuery } from "react-query";
import { getDropType } from "../../../lib/helper";

const useDropTypes = () => {
  const { isLoading, isError, data } = useQuery(
    "dropTypes",
    getDropType
  );
  
  return { data, isLoading, isError };
};

export default useDropTypes;
