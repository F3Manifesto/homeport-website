import { FunctionComponent, useContext } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useFlow from "./hooks/useFlow";
import { useRouter } from "next/router";
import { AiOutlineLoading } from "react-icons/ai";
import { GlobalContext } from "../../../pages/_app";
import useCurrency from "./hooks/useCurrency";

const Flow: FunctionComponent = (): JSX.Element => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { itemPrice } = useContext(GlobalContext);
  const { isLoading, isSuccess, isError, sendTransactionAsync } = useFlow();
  const {
    write,
    isLoading: LoadingCurrency,
    isSuccess: SuccessCurrency,
    isError: ErrorCurrency,
  } = useCurrency();
  let action = "NOT_CONNECTED";

  const decideStringAction = () => {
    if (isConnected) {
      action = "COLLECT";
    }

    if (
      isConnected &&
      ((!isLoading && !isSuccess && isError) ||
        (!LoadingCurrency && !SuccessCurrency && ErrorCurrency))
    ) {
      action = "ERROR";
    }

    // if () {
    //   action = "APPROVE"
    // }

    if (
      isConnected &&
      ((isLoading && !isSuccess && !isError) ||
        (LoadingCurrency && SuccessCurrency && ErrorCurrency))
    ) {
      action = "LOADING";
    }

    if (
      isConnected &&
      ((!isLoading && isSuccess && !isError) ||
        (!LoadingCurrency && SuccessCurrency && !ErrorCurrency))
    ) {
      action = "SUCCESS";
    }

    return action;
  };

  switch (decideStringAction()) {
    // case "APPROVE":
    //   return (
    //     <div onClick={() => {}} className="relative w-fit h-fit">
    //       APPROVE
    //     </div>
    //   );

    case "COLLECT":
      return (
        <div
          onClick={
            itemPrice.currency === "USD"
              ? async () => sendTransactionAsync?.()
              : async () => {
                  write?.();
                }
          }
          className="relative w-fit h-fit"
        >
          MAKE PAYMENT
        </div>
      );

    case "ERROR":
      return (
        <div
          onClick={
            itemPrice.currency === "USD"
              ? async () => sendTransactionAsync?.()
              : async () => {
                  write?.();
                }
          }
          className="relative w-fit h-fit"
        >
          TRY AGAIN
        </div>
      );

    case "LOADING":
      return (
        <div className="relative animate-spin w-40 h-10">
          <AiOutlineLoading size={5} color={"white"} />
        </div>
      );

    case "SUCCESS":
      router.push("/success");

    default:
      return (
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }: any) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: "0",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <p
                        onClick={openConnectModal}
                        className="font-awkward text-white cursor-pointer border-2 border-white p-2 text-[1.3em]"
                      >
                        CONNECT WALLET
                      </p>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <p
                        onClick={openChainModal}
                        className="font-awkward text-white cursor-pointer border-2 border-white p-2 text-[1.3em]"
                      >
                        SWITCH NETWORK
                        <span className="relative h-4 w-4 -top-4">
                          <span className="animate-ping absolute h-4 w-4 rounded-full opacity-75 bg-red-600"></span>
                          <span className="absolute inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                        </span>
                      </p>
                    );
                  }
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      );
  }
};
export default Flow;
