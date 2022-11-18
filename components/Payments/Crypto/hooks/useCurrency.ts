import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { utils } from "ethers";
import {
  MATIC_ADDRESS,
  MATIC_DECIMAL,
  MONA_ADDRESS,
  MONA_DECIMAL,
  transferABI,
  USDT_ADDRESS,
  USDT_DECIMAL,
} from "../../../../lib/constants";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";

const useCurrency = () => {
  const itemPrice = useSelector((state: RootState) => state.app.priceReducer);
  const adminPaymentAddress = useSelector(
    (state: RootState) => state.app.adminPaymentReducer.value
  );
  const { config, isError: errorConfig } = usePrepareContractWrite({
    address:
      itemPrice.token === "MONA"
        ? MONA_ADDRESS
        : itemPrice.token === "MATIC"
        ? MATIC_ADDRESS
        : USDT_ADDRESS,
    abi: transferABI,
    functionName: "transfer",
    chainId: 1,
    args: [
      adminPaymentAddress,
      utils.parseUnits(
        (itemPrice?.price).toString(),
        itemPrice.token === "MONA"
          ? MONA_DECIMAL
          : itemPrice.token === "MATIC"
          ? MATIC_DECIMAL
          : USDT_DECIMAL
      ),
    ],
  });

  const { data, write, error } = useContractWrite(config);

  const handleWriteCrypto = async () => {
    write?.();
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
    isSuccess,
    isError,
    handleWriteCrypto,
    error,
    hashData,
    errorConfig,
  };
};

export default useCurrency;
