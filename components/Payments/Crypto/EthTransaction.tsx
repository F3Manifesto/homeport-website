import { FunctionComponent, useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useFlow from "./hooks/useFlow";
import { useRouter } from "next/router";
import { AiOutlineLoading } from "react-icons/ai";
import useDetails from "../Common/hooks/useDetails";

const EthTransaction: FunctionComponent = (): JSX.Element => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();
  const { isLoading, isSuccess, isError, handleSendEth, sendError, hashData } =
    useFlow();
  const { handleAddressSubmit } = useDetails();
  useEffect(() => {
    if (hashData?.transactionHash) {
      handleAddressSubmit();
    }
  }, [isSuccess]);

  let action = "NOT_CONNECTED";

  const decideStringAction = () => {
    if (isConnected) {
      action = "COLLECT";
    }

    if ((isConnected && !isLoading && !isSuccess && isError) || sendError) {
      action = "ERROR";
    }

    if (isConnected && isLoading) {
      action = "LOADING";
    }

    if (
      isConnected &&
      !isLoading &&
      isSuccess &&
      !isError &&
      hashData?.transactionHash
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
          className="row-start-1 relative w-full h-fit bg-lBlue p-3 border-2 border-white text-white cursor-pointer active:scale-95 rounded-md py-4 grid grid-flow-col auto-cols-[auto auto]"
          onClick={() => handleSendEth()}
        >
          <div className="relative w-fit h-fit font-economica px-10 justify-self-center col-start-1 text-xl">
            PAY NOW
          </div>
        </div>
      );

    case "ERROR":
      return (
        <div
          className="row-start-1 relative w-full h-fit bg-lBlue p-3 border-2 border-white text-white cursor-pointer active:scale-95 rounded-md py-4 grid grid-flow-col auto-cols-[auto auto]"
          onClick={() => handleSendEth()}
        >
          <div className="relative w-fit h-fit font-economica px-10 justify-self-center col-start-1 text-xl">
            TRY AGAIN
          </div>
        </div>
      );

    case "LOADING":
      return (
        <div className="row-start-1 relative w-full h-fit bg-lBlue p-3 border-2 border-white text-white rounded-md py-4 grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative animate-spin w-fit h-fit place-self-center">
            <AiOutlineLoading size={15} color={"white"} />
          </div>
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
                      className="row-start-1 relative w-full h-fit bg-lBlue p-3 border-2 border-white text-white cursor-pointer active:scale-95 rounded-md py-4 grid grid-flow-col auto-cols-[auto auto]"
                      onClick={openChainModal}
                    >
                      <div className="relative w-full text-center h-full font-economica px-10 justify-self-center col-start-1 text-xl text-white">
                        SWITCH NETWORK
                      </div>
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
                        className="row-start-1 relative w-full h-fit bg-lBlue p-3 border-2 border-white text-white cursor-pointer active:scale-95 rounded-md py-4 grid grid-flow-col auto-cols-[auto auto]"
                        onClick={openConnectModal}
                      >
                        <div className="relative w-full text-center h-full font-economica px-10 justify-self-center col-start-1 text-xl">
                          CONNECT WALLET
                        </div>
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
export default EthTransaction;
