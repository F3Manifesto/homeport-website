import { useContext, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { GlobalContext } from "../../../pages/_app";
import { useMetadataResults } from "../../../types/general.types";
import { ethers } from "ethers";

const useMetadata = (): useMetadataResults => {
  const { contract } = useContext(GlobalContext);

  const [enabled, setEnabled] = useState<boolean>(false);
  const [args, setArgs] = useState<any>();

  const { config } = usePrepareContractWrite({
    address: contract,
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
      console.error("Error", error);
    },
    onSettled(error: any) {
      console.log("Settled", error);
    },
    onSuccess(error: any) {
      console.log("Success", error);
    },
    enabled: Boolean(enabled),
    args: [args],
  });

  const { isIdle, writeAsync } = useContractWrite(config);

  const collectNFT = async (address: string, price: number): Promise<void> => {
    const contractArgs = ethers.utils.parseUnits(price.toString(), 18);

    setArgs(contractArgs);
    setEnabled(true);
    console.log("here");

    try {
      const tx = await writeAsync?.();
      const res = await tx?.wait();
    } catch (err) {
      console.error(err);
    }
  };

  return { collectNFT };
};

export default useMetadata;
