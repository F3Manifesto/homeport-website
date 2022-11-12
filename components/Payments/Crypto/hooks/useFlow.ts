import {
  useSendTransaction,
  usePrepareSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { BigNumber } from "ethers";
import { useContext } from "react";
import { GlobalContext } from "../../../../pages/_app";

const useFlow = () => {
  const { itemPrice } = useContext(GlobalContext);
 
  const { config } = usePrepareSendTransaction({
    request: {
      to: "emmajane.eth",
      value: BigNumber.from("1"),
    },
  });
  const { data, sendTransactionAsync } = useSendTransaction(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { isLoading, isSuccess, isError, sendTransactionAsync };
};

export default useFlow;
