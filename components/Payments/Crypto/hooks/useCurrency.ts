import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import {
  MATIC_ADDRESS,
  MONA_ADDRESS,
  USDT_ADDRESS,
} from "../../../../lib/constants";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";

const useCurrency = () => {
  const itemPrice = useSelector(
    (state: RootState) => state.app.priceReducer
  );
  const { config } = usePrepareContractWrite({
    address:
      itemPrice.token === "MONA"
        ? MONA_ADDRESS
        : itemPrice.token === "MATIC"
        ? MATIC_ADDRESS
        : USDT_ADDRESS,
    abi: [
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "transfer",
    args: [
      "0xfa3fea500eeDAa120f7EeC2E4309Fe094F854E61",
      ethers.utils.parseEther("1"),
    ],
  });

  const { data, write, error } = useContractWrite(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { write, isLoading, isSuccess, isError };
};

export default useCurrency;