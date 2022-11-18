import {
  useSendTransaction,
  usePrepareSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const useFlow = () => {
  const itemPrice = useSelector((state: RootState) => state.app.priceReducer);
  const adminPaymentAddress = useSelector(
    (state: RootState) => state.app.adminPaymentReducer.value
  );
  const { config, isError: errorConfig } = usePrepareSendTransaction({
    request: {
      to: adminPaymentAddress,
      value: ethers.utils.parseEther((itemPrice?.price).toString()),
    },
    chainId: 1,
  });

  const {
    data,
    sendTransactionAsync,
    isError: sendError,
  } = useSendTransaction(config);

  const handleSendEth = async () => {
    await sendTransactionAsync?.();
  };

  const {
    isLoading,
    isSuccess,
    isError,
    data: hashData,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    isLoading,
    sendError,
    isSuccess,
    isError,
    sendTransactionAsync,
    data,
    handleSendEth,
    hashData,
    errorConfig,
  };
};

export default useFlow;
