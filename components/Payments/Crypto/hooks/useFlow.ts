import {
  useSendTransaction,
  usePrepareSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const useFlow = () => {
  const itemPrice = useSelector(
    (state: RootState) => state.app.priceReducer
  );

  const { config } = usePrepareSendTransaction({
    request: {
      to: "0xfa3fea500eeDAa120f7EeC2E4309Fe094F854E61",
      value: ethers.utils.parseEther("1"),
    },
  });
  const { data, sendTransactionAsync} = useSendTransaction(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { isLoading, isSuccess, isError, sendTransactionAsync, data };
};

export default useFlow;
