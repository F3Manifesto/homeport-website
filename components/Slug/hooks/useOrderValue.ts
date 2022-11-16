import { FormEvent, useContext, useEffect, useMemo, useState } from "react";
import { UseOrderValueResult } from "../../../types/general.types";
import {
  aggregatorV3InterfaceABI,
  BASE_URL,
  ETHUSD,
  MATICUSD,
  USDTUSD,
} from "../../../lib/constants";
import { useContractReads } from "wagmi";
import lodash from "lodash";
import { GlobalContext } from "../../../pages/_app";
import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "../../../redux/reducers/priceSlice";
import { RootState } from "../../../redux/store";
import { useQuery } from "react-query";
import { getCurrency } from "../../../lib/helpers";

const useOrderValue = (): UseOrderValueResult => {
  const [ethConversion, setEthConversion] = useState<string>();
  const [monaConversion, setMonaConversion] = useState<string>();
  const [usdtConversion, setUsdtConversion] = useState<string>();
  const [maticConversion, setMaticConversion] = useState<string>();
  const currencySlug = useSelector(
    (state: RootState) => state.app.currencyReducer.itemSlug
  );
  const { data: currencyData } = useQuery(["currency", currencySlug], () =>
    getCurrency(currencySlug as string)
  );

  const USDPRICESET: number = currencyData?.usdPrice as number;
  const USDTPRICESET: number = currencyData?.usdtPrice as number;
  const ETHPRICESET: number = currencyData?.ethPrice as number;
  const MATICPRICESET: number = currencyData?.maticPrice as number;
  const MONAPRICESET: number = currencyData?.monaPrice as number;
  const [selectedPrice, setSelectedPrice] = useState<string>("usd");
  const [monaPrice, setMonaPrice] = useState<number>(0);
  const [featurePrice, setFeaturePrice] = useState<number>(USDPRICESET);
  const tokens: string[] = ["mona", "eth", "usdt", "matic"];
  const layoutIndexes: number[] = [1, 1, 2, 1, 2, 2, 2, 2];
  const [convertedPrice, setConvertedPrice] = useState<number>(USDPRICESET);
  const [currencyTag, setCurrencyTag] = useState<string>("USD");
  const [clickedToken, setClickedToken] = useState<string>("");
  const { quantity, setQuantity } = useContext(GlobalContext);
  const { setItemName } = useContext(GlobalContext);
  const [payment, setPayment] = useState<string>("default");
  const dispatch = useDispatch();
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
      const response = await fetch(`${BASE_URL}/api/coin`, {
        method: "POST",
      });
      return response.json();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useMemo(async () => {
    const data = await getMONAPrice();
    setMonaPrice(data?.data?.monavale?.usd);
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

  const increaseQuantity = (max: number): void => {
    if (quantity + 1 <= max) {
      setQuantity(quantity + 1);
    } else {
      alert(`There are only ${max} number of item/s in this drop!`);
    }
  };

  const decreaseQuantity = (): void => {
    if (quantity - 1 !== 0) {
      setQuantity(quantity - 1);
    }
  };

  const setPurchase = (e: string): void => {
    setItemName("order");
    if (e === "crypto") {
      dispatch(
        setPrice({
          actionPrice: convertedPrice.toFixed(2),
          actionToken: currencyTag,
        })
      );
    } else {
      dispatch(setPrice({ actionPrice: USDPRICESET, actionToken: "USD" }));
    }
  };

  const showCurrencyETH = (e: FormEvent) => {
    e.preventDefault();
    const ETHUSD = parseInt(
      (lodash.chunk(data, 3)[0][2] as Array<any>)[1]._hex.toString()
    );
    const ETHConversion =
      (e.target as HTMLFormElement).value /
      Number(ETHUSD / Math.pow(10, Number(lodash.chunk(data, 3)[0][0])));
    setEthConversion(ETHConversion.toFixed(2).toString());
  };

  const showCurrencyMona = (e: FormEvent) => {
    e.preventDefault();
    setMonaConversion(
      ((e.target as HTMLFormElement).value / monaPrice).toFixed(2).toString()
    );
  };

  const showCurrencyMatic = (e: FormEvent) => {
    e.preventDefault();
    const MATICUSD = parseInt(
      (lodash.chunk(data, 3)[2][2] as Array<any>)[1]._hex.toString()
    );
    const MaticConversion =
      (e.target as HTMLFormElement).value *
      Number(MATICUSD / Math.pow(10, Number(lodash.chunk(data, 3)[2][0])));
    setMaticConversion(MaticConversion.toFixed(2).toString());
  };

  const showCurrencyUsdt = (e: FormEvent) => {
    e.preventDefault();
    const USDTUSD = parseInt(
      (lodash.chunk(data, 3)[1][2] as Array<any>)[1]._hex.toString()
    );
    const USDTConversion =
      Number(USDTUSD / Math.pow(10, Number(lodash.chunk(data, 3)[1][0]))) *
      (e.target as HTMLFormElement).value;
    setUsdtConversion(USDTConversion.toFixed(2).toString());
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
    showCurrencyETH,
    showCurrencyMatic,
    showCurrencyMona,
    showCurrencyUsdt,
    ethConversion,
    monaConversion,
    maticConversion,
    usdtConversion,
    USDPRICESET,
  };
};

export default useOrderValue;
