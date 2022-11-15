import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import { getCurrencies } from "../../../../lib/helpers";

const useCheckCurrency = () => {
  const { isLoading, isError, data: currencyData } = useQuery("currency", getCurrencies);

  return {currencyData}
};

export default useCheckCurrency;
