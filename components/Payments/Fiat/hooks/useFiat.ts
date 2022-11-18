import { Appearance, StripeElementsOptions } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GlobalContext } from "../../../../pages/_app";
import { RootState } from "../../../../redux/store";
import { UseFiatResult } from "../../../../types/general.types";

const useFiat = (): UseFiatResult => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const { quantity, itemName } = useContext(GlobalContext);
  const itemPrice = useSelector((state: RootState) => state.app.priceReducer);

  const appearance: Appearance = {
    theme: "night",
    variables: {
      colorPrimary: "#76b3f4",
      colorBackground: "#000000",
    },
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  const createPayment = async (): Promise<void> => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: itemName, quantity, itemPrice }],
        }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
      return data.clientSecret
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    createPayment();
  }, []);

  return {
    clientSecret,
    options,
  };
};

export default useFiat;
