import { useContext, useEffect, useMemo, useState } from "react";
import { UseOrderResult } from "../../../types/general.types";
import {
  aggregatorV3InterfaceABI,
  ETHUSD,
  MATICUSD,
  USDTUSD,
} from "./../../../lib/constants";
import { useContractReads } from "wagmi";
import lodash from "lodash";
import { GlobalContext } from "../../../pages/_app";

const useOrder = (): UseOrderResult => {
  const USDPRICESET: number = 56;
  const USDTPRICESET: number = 52;
  const ETHPRICESET: number = 40;
  const MATICPRICESET: number = 60;
  const MONAPRICESET: number = 30;
  const [selectedPrice, setSelectedPrice] = useState<string>("usd");
  const [monaPrice, setMonaPrice] = useState<number>(0);
  const [featurePrice, setFeaturePrice] = useState<number>(USDPRICESET);
  const tokens: string[] = ["mona", "eth", "usdt", "matic"];
  const layoutIndexes: number[] = [1, 1, 2, 1, 2, 2, 2, 2];
  const [convertedPrice, setConvertedPrice] = useState<number>(USDPRICESET);
  const [currencyTag, setCurrencyTag] = useState<string>("USD");
  const [clickedToken, setClickedToken] = useState<string>("");
  const { quantity, setQuantity } = useContext(GlobalContext);
  const { itemName, setItemName, itemPrice, setItemPrice } =
    useContext(GlobalContext);
  const [payment, setPayment] = useState<string>("default");

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
      {
        address: MATICUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "decimals",
      },
      {
        address: MATICUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "description",
      },
      {
        address: MATICUSD,
        abi: aggregatorV3InterfaceABI as any,
        functionName: "latestRoundData",
      },
    ],
    watch: true,
  });

  useEffect(() => {
    showSelectedPrice();
  }, [selectedPrice]);

  const getMONAPrice = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/coin", {
        method: "POST",
      });
      return response.json();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useMemo(async () => {
    const data = await getMONAPrice();
    setMonaPrice(data.data.monavale.usd);
  }, []);

  const showSelectedPrice = (): void => {
    if (selectedPrice === "eth") {
      const ETHUSD = parseInt(
        (lodash.chunk(data, 3)[0][2] as Array<any>)[1]._hex.toString()
      );
      setConvertedPrice(
        ETHPRICESET /
          Number(ETHUSD / Math.pow(10, Number(lodash.chunk(data, 3)[0][0])))
      );
      setCurrencyTag("ETH");
      setFeaturePrice(ETHPRICESET);
    } else if (selectedPrice === "usdt") {
      const USDTUSD = parseInt(
        (lodash.chunk(data, 3)[1][2] as Array<any>)[1]._hex.toString()
      );
      setConvertedPrice(
        Number(USDTUSD / Math.pow(10, Number(lodash.chunk(data, 3)[1][0]))) *
          USDTPRICESET
      );
      setCurrencyTag("USDT");
      setFeaturePrice(USDTPRICESET);
    } else if (selectedPrice === "matic") {
      const MATICUSD = parseInt(
        (lodash.chunk(data, 3)[2][2] as Array<any>)[1]._hex.toString()
      );
      setConvertedPrice(
        MATICPRICESET *
          Number(MATICUSD / Math.pow(10, Number(lodash.chunk(data, 3)[2][0])))
      );
      setCurrencyTag("MATIC");
      setFeaturePrice(MATICPRICESET);
    } else if (selectedPrice === "mona") {
      setConvertedPrice(MONAPRICESET / monaPrice);
      setCurrencyTag("MONA");
      setFeaturePrice(MONAPRICESET);
    }
  };

  const increaseQuantity = (): void => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = (): void => {
    if (quantity - 1 !== 0) {
      setQuantity(quantity - 1);
    }
  };

  const setPurchase = (e: string): void => {
    setItemName("order");
    if (e === "crypto") {
      setItemPrice({ price: featurePrice, currency: currencyTag });
    } else {
      setItemPrice({ price: USDPRICESET, currency: "USD" });
    }
  };

  return {
    tokens,
    layoutIndexes,
    setSelectedPrice,
    setPurchase,
    increaseQuantity,
    decreaseQuantity,
    featurePrice,
    convertedPrice,
    currencyTag,
    clickedToken,
    setClickedToken,
    setPayment,
    payment,
  };
};

export default useOrder;
