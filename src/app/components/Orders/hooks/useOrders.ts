import { useEffect, useState } from "react";
import { EncryptedData, Order } from "../types/orders.types";
import { useAccount } from "wagmi";
import { getOrders } from "../../../../../graphql/queries/getOrders";
import { INFURA_GATEWAY, orderStatus } from "@/app/lib/constants";
import { decryptData } from "@/app/lib/helpers/encryption";

const useOrders = (dict: any) => {
  const { address } = useAccount();
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false);
  const [decryptLoading, setDecryptLoading] = useState<boolean[]>([]);
  const [orderOpen, setOrderOpen] = useState<boolean[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [privateKey, setPrivateKey] = useState<string | null>(null);

  const handleOrders = async () => {
    setOrdersLoading(true);
    try {
      const data = await getOrders(address!);

      setOrders(
        (
          data?.data?.orderCreateds?.map((order: Order) => ({
            ...order,
            decrypted: false,
            status: orderStatus[Number(order?.status)],
            totalPrice: Number(order?.totalPrice) / 10 ** 18,
          })) || []
        )?.sort(
          (a: Order, b: Order) =>
            Number(b?.blockTimestamp) - Number(a?.blockTimestamp)
        )
      );
      setOrderOpen(
        Array.from({ length: data?.data?.orderCreateds?.length }, () => false)
      );
      setDecryptLoading(
        Array.from({ length: data?.data?.orderCreateds?.length }, () => false)
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setOrdersLoading(false);
  };

  const handleDecrypt = async (index: number) => {
    setDecryptLoading((prev) => {
      let arr = [...prev];

      arr[index] = true;

      return arr;
    });

    if (!address) {
      return;
    }

    try {
      const data = await fetch(
        `${INFURA_GATEWAY}/ipfs/${
          orders[index]?.details?.split("ipfs://")?.[1]
        }`
      );

      let key = privateKey;

      if (!key) {
        const promptMessage = dict?.common?.decryptPrompt;
        const promptValue = window.prompt(promptMessage);

        if (!promptValue) {
          return;
        }

        key = promptValue.trim();

        if (!key.startsWith("0x")) {
          key = `0x${key}`;
        }

        setPrivateKey(key);
      }

      const details = (await data.json()) as EncryptedData;

      const fulfillment = await decryptData(details, key, address);

      setOrders((prev) => {
        const pedidos = [...prev];
        pedidos[index] = {
          ...pedidos[index],
          fulfillment,
          decrypted: true,
        };
        return pedidos;
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setDecryptLoading((prev) => {
      let arr = [...prev];

      arr[index] = false;

      return arr;
    });
  };

  useEffect(() => {
    if (address && orders?.length < 1) {
      handleOrders();
    }
  }, [address]);

  return {
    ordersLoading,
    orders,
    decryptLoading,
    handleDecrypt,
    orderOpen,
    setOrderOpen,
  };
};

export default useOrders;
