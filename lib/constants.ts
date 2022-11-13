import { AggregatorInterface } from "../types/general.types";

export const BASE_URL: string = "http://localhost:3000/";
export const ETHUSD: string = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
export const USDTUSD: string = "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D";
export const MATICUSD: string = "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676";
export const MONA_ADDRESS: string =
  "0x275f5Ad03be0Fa221B4C6649B8AeE09a42D9412A";
export const MATIC_ADDRESS: string =
  "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";
export const USDT_ADDRESS: string =
  "0xdac17f958d2ee523a2206206994597c13d831ec7";

export const aggregatorV3InterfaceABI: AggregatorInterface[] = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
