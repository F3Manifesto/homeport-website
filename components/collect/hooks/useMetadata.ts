import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useMetadataResults } from "../../../types/general.types";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const useMetadata = (): useMetadataResults => {
  const { address } = useAccount();

  const [enabled, setEnabled] = useState<boolean>(false);
  const [args, setArgs] = useState<number>();
  const [price, setPrice] = useState<string>();
  const [contractAddress, setContractAddress] = useState<string>();
  const [errorState, setErrorState] = useState<boolean>(false);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    chainId: 1,
    abi: [
      {
        name: "purchase",
        type: "function",
        stateMutability: "payable",
        inputs: [
          { internalType: "uint256", name: "quantity", type: "uint256" },
        ],
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      },
    ],
    functionName: "purchase",
    onError(error: any) {
      console.error("Error", error.code);
      if (error.code == "INSUFFICIENT_FUNDS") {
        setErrorState(true);
      }
    },
    enabled: Boolean(enabled),
    args: [args],
    overrides: {
      from: address,
      value: price,
    },
  });

  const { writeAsync } = useContractWrite(config);

  const prepareNFTData = (
    address: string,
    price: number,
    amount: number
  ): void => {
    setEnabled(true);
    const contractArgs: number = 1;
    setContractAddress(address);
    setPrice(ethers.utils.parseEther(price.toString()));
    setArgs(contractArgs);
  };

  const collectNFT = async (): Promise<void> => {
    try {
      const tx: any = await writeAsync?.();
      const res: any = await tx?.wait();
    } catch (err: any) {
      console.error(err);
    }
    setEnabled(false);
  };

  return { collectNFT, errorState, setErrorState, prepareNFTData };
};

export default useMetadata;
