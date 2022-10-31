import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useMetadataResults } from "../../../types/general.types";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const useMetadata = (): useMetadataResults => {
  const { address } = useAccount();

  const [enabled, setEnabled] = useState<boolean>(false);
  const [args, setArgs] = useState<number | any | any>();
  const [price, setPrice] = useState<string>();
  const [contractAddress, setContractAddress] = useState<string>();
  const [errorState, setErrorState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [abiFunction, setAbiFunction] = useState<string>();

  console.log(contractAddress);

  const { config } = usePrepareContractWrite({
    address:
      abiFunction === "collection"
        ? contractAddress
        : "0x6170B3C3A54C3d8c854934cBC314eD479b2B29A3",
    chainId: 1,
    abi:
      abiFunction === "collection"
        ? [
            {
              name: "purchase",
              type: "function",
              stateMutability: "payable",
              inputs: [
                { internalType: "uint256", name: "quantity", type: "uint256" },
              ],
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            },
          ]
        : [
            {
              name: "fillAsk",
              type: "function",
              stateMutability: "payable",
              inputs: [
                {
                  internalType: "address",
                  name: "_tokenContract",
                  type: "address",
                },
                { internalType: "uint256", name: "_tokenId", type: "uint256" },
                {
                  internalType: "address",
                  name: "_fillCurrency",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_fillAmount",
                  type: "uint256",
                },
                { internalType: "address", name: "_finder", type: "address" },
              ],

              outputs: [],
            },
          ],
    functionName: abiFunction === "collection" ? "purchase" : "fillAsk",
    onError(error: any) {
      console.error("Error", error);
      if (error.code == "INSUFFICIENT_FUNDS") {
        setErrorState(true);
      }
    },
    enabled: Boolean(enabled),
    args: args,
    overrides: {
      from: address,
      value: price,
    },
  });

  const { writeAsync } = useContractWrite(config);

  const prepareNFTDataCollection = (
    address: string,
    price: number,
    amount: number
  ): void => {
    setEnabled(true);
    const contractArgs: number[] = [1];
    setContractAddress(address);
    setPrice(ethers.utils.parseEther(price.toString()));
    setArgs(contractArgs);
  };

  const collectNFT = async (): Promise<void> => {
    if (errorState) {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorState(false);
        setErrorMessage(false);
      }, 4000);
      return;
    }
    try {
      const tx: any = await writeAsync?.();
      const res: any = await tx?.wait();
    } catch (err: any) {
      console.error(err);
    }
    setEnabled(false);
  };

  const collectMarket = async (): Promise<void> => {
    try {
      const tx: any = await writeAsync?.();
      const res: any = await tx?.wait();
    } catch (err: any) {
      console.error(err);
    }
    setEnabled(false);
  };

  const prepareNFTDataMarket = (
    address: string,
    price: number,
    amount: number
  ): void => {
    setEnabled(true);
    const contractArgs = [
      address,
      "1",
      "0x0000000000000000000000000000000000000000",
      ethers.utils.parseEther(price.toString()),
      "0x0000000000000000000000000000000000000000",
    ];
    setContractAddress(address);
    setPrice(ethers.utils.parseEther(price.toString()));
    setArgs(contractArgs);
  };

  return {
    collectNFT,
    errorState,
    prepareNFTDataCollection,
    errorMessage,
    collectMarket,
    prepareNFTDataMarket,
    setAbiFunction,
  };
};

export default useMetadata;
