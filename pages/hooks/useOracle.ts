import { useContractReads } from "wagmi";
import { UseOracleResult } from "../../types/general.types";
import {
  aggregatorV3InterfaceABI,
  ETHUSD,
  BTCUSD,
  USDTUSD,
} from "./../../lib/constants";

const useOracle = (): UseOracleResult => {
  const { data } = useContractReads({
    contracts: [
      {
        address: ETHUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "decimals",
      },
      {
        address: ETHUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "description",
      },
      {
        address: ETHUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "latestRoundData",
      },
      {
        address: BTCUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "decimals",
      },
      {
        address: BTCUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "description",
      },
      {
        address: BTCUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "latestRoundData",
      },
      {
        address: USDTUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "decimals",
      },
      {
        address: USDTUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "description",
      },
      {
        address: USDTUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "latestRoundData",
      },
    ],
    watch: true
  });

  return { data };
};

export default useOracle;
