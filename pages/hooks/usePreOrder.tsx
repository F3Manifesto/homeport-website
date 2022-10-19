import { useEffect, useState } from "react";
import { usePreOrderResults } from "../../types/general.types";

const usePreOrder = (): usePreOrderResults => {
  const [orderIRLChoice, setOrderIRLChoice] = useState<string>("");

  const getOrderItem = (): void => {
    if (typeof window !== "undefined") {
      const orderIRLItem: string | null = sessionStorage.getItem("orderIRL");
      if (orderIRLItem) {
        setOrderIRLChoice(orderIRLItem);
      } else {
        setOrderIRLChoice("");
      }
    }
  };

  useEffect(() => {
    getOrderItem();
  }, []);

  return { orderIRLChoice };
};

export default usePreOrder;
