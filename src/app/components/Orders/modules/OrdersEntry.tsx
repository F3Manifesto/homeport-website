"use client";

import RouterChange from "../../Common/modules/RouterChange";
import { useRouter } from "next/navigation";
import { AiFillBackward } from "react-icons/ai";
import useOrders from "../hooks/useOrders";
import Connect from "../../Collect/modules/Connect";
import Image from "next/image";
import { ACCEPTED_TOKENS, INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import { Details } from "../../Collect/types/collect.types";

export default function OrdersEntry({
  dict,
  lang,
}: {
  dict: any;
  lang: string;
}) {
  const router = useRouter();
  const {
    ordersLoading,
    orders,
    decryptLoading,
    handleDecrypt,
    orderOpen,
    setOrderOpen,
  } = useOrders();

  if (!ordersLoading) {
    return (
      <div className="flex h-full min-h-screen w-full relative cursor-empire selection:bg-lightYellow selection:text-lightYellow bg-gradient-to-b from-lightY via-white to-lightPurple items-start justify-center">
        <div className="w-full h-full flex flex-col relative items-center justify-start">
          <div className="relative w-full h-fit flex flex-row justify-between gap-4 items-center py-8 px-4 sm:flex-nowrap flex-wrap">
            <div
              onClick={() => router.back()}
              className="relative w-fit h-fit flex mr-auto text-offBlack font-fira opacity-80 hover:opacity-20 cursor-empireS flex-row gap-2"
            >
              <AiFillBackward
                color="#131313"
                size={25}
                className="float-left mr-2"
              />
              <div className="relative w-fit h-fit flex items-center justify-center">
                {dict?.collect?.return}
              </div>
            </div>
            <div className="w-fit h-fit ml-auto flex items-center justify-center hover:text-offBlue underline underline-offset-4 h-fit relative">
              <Connect dict={dict} />
            </div>
          </div>
          <div className="relative w-full h-fit flex border-t-4 border-lightWhite px-4 py-7">
            <h1
              className="relative flex items-center justify-start font-jacklane text-4xl sm:text-7xl"
              dir={lang == "ar" ? "rtl" : "ltr"}
            >
              {dict?.common?.orders}
            </h1>
          </div>

          <div
            className={`relative w-full min-h-screen flex bg-foot py-8 border-y-8 border-lightWhite flex-col gap-20 p-4 font-firaL ${
              orders?.length
                ? "items-start justify-start"
                : "items-center justify-center"
            }`}
          >
            {orders?.length > 1 ? (
              <div className="relative w-full h-full flex overflow-y-scroll h-full items-start justify-start">
                <div className="relative w-full h-fit items-start justify-start flex flex-col gap-3">
                  {orders?.map((order, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`relative w-full flex items-start justify-start p-1 border-4 cursor-empireS text-lightYellow text-sm border-lightPurple bg-grad1 flex-col ${
                          orderOpen[index] ? "h-fit" : "h-fit sm:h-28"
                        }`}
                        onClick={() =>
                          setOrderOpen((prev) => {
                            let arr = [...prev];
                            arr[index] = !arr[index];

                            return arr;
                          })
                        }
                      >
                        <div
                          className={`relative w-full flex flex-col sm:flex-row justify-start sm:justify-between item-start sm:items-center gap-4 h-fit sm:h-28 p-2 `}
                        >
                          <div className="relative justify-between items-start w-fit h-full flex flex-col gap-5">
                            <div className="relative w-fit h-fit flex items-center justify-start break-words whitespace-nowrap">
                              {dict?.common?.order} {"Id"} {order?.orderId}
                            </div>
                            <div className="relative w-full h-full flex items-end justify-center text-3xl">
                              USD {Number(order?.totalPrice)}
                            </div>
                          </div>
                          <div className="relative w-fit h-full flex items-start sm:items-center justify-start sm:justify-between text-left sm:text-right flex-col gap-3">
                            <div className="relative w-full h-fit flex sm:items-end sm:justify-end break-all items-start justify-start">
                              {order?.blockTimestamp}
                            </div>
                            <div className="relative w-fit h-fit flex sm:items-end sm:justify-end flex-col gap-1 items-start justify-start">
                              <div className="relative w-fit h-fit flex sm:items-center sm:justify-end break-all items-start justify-start">
                                {dict?.common?.tx}
                              </div>
                              <div
                                className="relative w-fit h-fit flex sm:items-center sm:justify-end break-all cursor-empireS text-xs text-ligero items-start justify-start"
                                onClick={() =>
                                  window.open(
                                    `https://explorer.lens.xyz/tx/${order.transactionHash}`
                                  )
                                }
                              >
                                {order.transactionHash.slice(0, 20)}...
                              </div>
                            </div>
                          </div>
                        </div>
                        {orderOpen?.[index] && (
                          <div className="relative w-full flex flex-col justify-between items-center gap-10 sm:gap-4 h-fit p-2">
                            <div className="relative h-px w-full bg-lightYellow flex"></div>
                            <div className="relative w-full h-fit flex items-start justify-between gap-4 md:flex-nowrap flex-wrap">
                              <div className="relative w-full h-fit flex items-center flex-row gap-3 justify-start flex-wrap">
                                {[
                                  {
                                    titulo: dict?.collect?.address,
                                    valor: order?.decrypted
                                      ? (order?.fulfillment as Details)?.address
                                      : "$%^&*#$%",
                                  },
                                  {
                                    titulo: dict?.collect?.zip,
                                    valor: order.decrypted
                                      ? (order?.fulfillment as Details)?.zip
                                      : "$%^&*#$%",
                                  },
                                  {
                                    titulo: dict?.collect?.city,
                                    valor: order.decrypted
                                      ? (order?.fulfillment as Details)?.city
                                      : "$%^&*#$%",
                                  },
                                  {
                                    titulo: dict?.collect?.state,
                                    valor: order.decrypted
                                      ? (order?.fulfillment as Details)?.state
                                      : "$%^&*#$%",
                                  },
                                  {
                                    titulo: dict?.collect?.country,
                                    valor: order.decrypted
                                      ? (order?.fulfillment as Details)?.country
                                      : "$%^&*#$%",
                                  },
                                ].map(
                                  (
                                    item: {
                                      titulo: string;
                                      valor: string;
                                    },
                                    indice: number
                                  ) => {
                                    return (
                                      <div
                                        className="relative w-fit h-fit flex items-start flex-col justify-center gap-1 text-left text-xs"
                                        key={indice}
                                      >
                                        <div className="relative w-fit h-fit flex items-center justify-start text-white break-all">
                                          {item.titulo}
                                        </div>
                                        <div className="relative w-fit h-fit flex items-center justify-start text-ligero break-all">
                                          {item.valor}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                              <div className="relative w-fit h-fit flex items-center">
                                <div
                                  className={`relative px-1.5 py-1 w-32 h-8 flex text-grad1 items-center border-white border bg-lightPurple justify-center ${
                                    !decryptLoading?.[index] && !order.decrypted
                                      ? "active:scale-95"
                                      : "cursor-default"
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (
                                      !decryptLoading?.[index] &&
                                      !order.decrypted
                                    ) {
                                      handleDecrypt(index);
                                    }
                                  }}
                                >
                                  {decryptLoading?.[index] ? (
                                    <div className="relative animate-spin w-fit h-fit flex items-center justify-center">
                                      <div className="w-4 h-4 relative flex items-center justify-center animate-spin">
                                        <Image
                                          layout="fill"
                                          draggable={false}
                                          src={`${INFURA_GATEWAY_INTERNAL}QmWcaVfpqyRB2BQ9swPHBB85fBTQSjQgoh4LNt1tWTXPmU`}
                                          alt="loader"
                                        />
                                      </div>
                                    </div>
                                  ) : !order.decrypted ? (
                                    dict?.common?.descifrar
                                  ) : (
                                    dict?.common?.descifrado
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="relative w-full h-full flex items-start justify-start">
                              <div className="relative w-full flex items-center justify-between flex-row h-fit gap-4 flex-wrap sm:flex-nowrap">
                                <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-2">
                                  <div className="flex w-fit h-fit relative item-center justify-start whitespace-nowrap break-words">
                                    {order.amount} x {Number(order.totalPrice)}
                                  </div>
                                  <div className="relative w-fit h-fit flex items-center justify-start">
                                    <div className="relative w-8 h-8 rounded-md flex items-center justify-center bg-lightPurple border border-ligero">
                                      <Image
                                        alt={`${order?.collection?.metadata?.title} | F3Manifesto by Emma-Jane MacKinnon-Lee`}
                                        src={`${INFURA_GATEWAY_INTERNAL}${
                                          order?.collection?.metadata?.images?.[0]?.split(
                                            "ipfs://"
                                          )?.[1]
                                        }`}
                                        layout="fill"
                                        className="rounded-md"
                                        draggable={false}
                                        objectFit="cover"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {order?.fulfillment?.tamano &&
                                  order?.fulfillment?.tamano !== "" && (
                                    <div className="relative flex w-fit h-fit justify-center items-center">
                                      <div
                                        className={`relative w-7 h-7 flex items-center justify-center cursor-empireS active:scale-95 text-white font-con text-xs`}
                                      >
                                        {order?.fulfillment?.tamano}
                                      </div>
                                    </div>
                                  )}
                                <div className="relative w-fit h-fit flex">
                                  <div className="relative flex items-center w-7 h-7 rounded-full bg-lightPurple   justify-center border border-white">
                                    <Image
                                      src={`${INFURA_GATEWAY_INTERNAL}${
                                        ACCEPTED_TOKENS?.find(
                                          (tok) =>
                                            tok[2].toLocaleLowerCase() ==
                                            order?.currency?.toLowerCase()
                                        )?.[0]
                                      }`}
                                      alt={order?.orderId}
                                      className="flex rounded-full"
                                      draggable={false}
                                      layout="fill"
                                      objectFit="cover"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div
                dir={lang == "ar" ? "rtl" : "ltr"}
                className="relative w-fit h-fit flex items-center justify-center font-firaL"
              >
                {dict?.common?.noOrders}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <RouterChange />;
}
