import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrency,
  getCurrency,
  updateCurrency,
} from "../../../../lib/helpers";
import { setCurrency } from "../../../../redux/reducers/currencySlice";
import { RootState } from "../../../../redux/store";
import {
  CurrencyInterface,
  UseAddCurrencyResult,
} from "../../../../types/general.types";

const useAddCurrency = (): UseAddCurrencyResult => {
  const [success, setSuccess] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const productInfo = useSelector(
    (state: RootState) => state.app.selectedDropReducer
  );
  const { data: oneCurrencyData } = useQuery(
    ["currency", productInfo?.slug],
    () => getCurrency(productInfo?.slug as string)
  );
  const dispatch = useDispatch();
  const addMutation = useMutation(addCurrency, {
    onSuccess: async () => {
      setSuccess(true);
    },
  });
  const handleCurrencySubmit = (e: FormEvent): void => {
    e.preventDefault();
    const currencyDataType: CurrencyInterface = {
      itemSlug: productInfo?.slug as string,
      itemName: productInfo?.name as string,
      usdPrice: (e.target as HTMLFormElement).usdPrice.value,
      ethPrice: (e.target as HTMLFormElement).ethPrice.value,
      monaPrice: (e.target as HTMLFormElement).monaPrice.value,
      usdtPrice: (e.target as HTMLFormElement).usdtPrice.value,
      maticPrice: (e.target as HTMLFormElement).maticPrice.value,
    };
    addMutation.mutate(currencyDataType);
    dispatch(
      setCurrency({
        actionSlug: productInfo?.slug as string,
        actionName: productInfo?.name as string,
        actionUSD: (e.target as HTMLFormElement).usdPrice.value,
        actionETH: (e.target as HTMLFormElement).ethPrice.value,
        actionMONA: (e.target as HTMLFormElement).monaPrice.value,
        actionUSDT: (e.target as HTMLFormElement).usdtPrice.value,
        actionMATIC: (e.target as HTMLFormElement).maticPrice.value,
      })
    );
    (e.target as HTMLFormElement).reset();
  };

  const updatedMutation = useMutation(
    (currencyUpdatedData: CurrencyInterface) =>
      updateCurrency(productInfo?.slug as string, currencyUpdatedData),
    {
      onSuccess: async () => {
        setUpdateSuccess(true);
      },
    }
  );

  const handleUpdateCurrency = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const currencyDataType: CurrencyInterface = {
      itemSlug: productInfo?.slug as string,
      itemName: productInfo?.name as string,
      usdPrice: (e.target as HTMLFormElement).usdPrice.value,
      ethPrice: (e.target as HTMLFormElement).ethPrice.value,
      monaPrice: (e.target as HTMLFormElement).monaPrice.value,
      usdtPrice: (e.target as HTMLFormElement).usdtPrice.value,
      maticPrice: (e.target as HTMLFormElement).maticPrice.value,
    };
    try {
      await updatedMutation.mutate(currencyDataType);
    } catch (err: any) {
      console.error(err.message);
    }
    (e.target as HTMLFormElement).reset();
  };

  return {
    handleCurrencySubmit,
    success,
    oneCurrencyData,
    handleUpdateCurrency,
  };
};

export default useAddCurrency;
