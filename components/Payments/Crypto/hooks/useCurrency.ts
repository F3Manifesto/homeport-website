import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { BigNumber } from "ethers";
import { useContext } from "react";
import { GlobalContext } from "../../../../pages/_app";
import {
  MATIC_ADDRESS,
  MONA_ADDRESS,
  USDT_ADDRESS,
} from "../../../../lib/constants";

const useCurrency = () => {
  const { itemPrice } = useContext(GlobalContext);
  const { config } = usePrepareContractWrite({
    address:
      itemPrice.currency === "MONA"
        ? MONA_ADDRESS
        : itemPrice.currency === "MATIC"
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
      BigNumber.from(itemPrice.price.toString()),
    ],
  });

  const {data, write} = useContractWrite(config)

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  //   const approveTokenSpend = async () => {
  //     try {
  //     } catch (err: any) {
  //       console.error(err.message);
  //     }
  //   };

  return { write, isLoading, isSuccess, isError };
};

export default useCurrency;
