import { FunctionComponent, useContext } from "react";
import { useAccount, useNetwork } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useFlow from "./hooks/useFlow";
import { useRouter } from "next/router";
import { AiOutlineLoading } from "react-icons/ai";
import { GlobalContext } from "../../../pages/_app";
import useCurrency from "./hooks/useCurrency";
import { BigNumber } from "ethers";

const Flow: FunctionComponent = (): JSX.Element => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
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

    if (isConnected && chain?.id !== 1) {
      action = "SWITCH";
    }

    return action;
  };

  switch (decideStringAction()) {
    case "COLLECT":
      return (
        <div
          onClick={
            itemPrice.currency === "ETH"
              ? async () => sendTransactionAsync?.()
              : async () => {
                  write?.();
                }
          }
          className="relative w-fit h-fit font-economica px-10 justify-self-center col-start-1 text-xl"
        >
          PAY NOW
        </div>
      );

    case "ERROR":
      return (
        <div
          onClick={
            itemPrice.currency === "ETH"
              ? async () => sendTransactionAsync?.()
              : async () => {
                  write?.();
                }
          }
          className="relative w-fit h-fit font-economica px-10 justify-self-center col-start-1 text-xl"
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

    case "SWITCH":
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
                  return (
                    <div
                      onClick={openChainModal}
                      className="relative w-full text-center h-full font-economica px-10 justify-self-center col-start-1 text-xl text-white"
                    >
                      SWITCH NETWORK
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      );

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
                      <div
                        onClick={openConnectModal}
                        className="relative w-full text-center h-full font-economica px-10 justify-self-center col-start-1 text-xl"
                      >
                        CONNECT WALLET
                      </div>
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
