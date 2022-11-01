import Image from "next/image";
import { FunctionComponent, useContext, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useAccount } from "wagmi";
import { CollectContext } from "../../pages/collect/[name]";
import { CollectProps } from "../../types/general.types";

const Collect: FunctionComponent<CollectProps> = ({
  connect,
  token,
  errorMessage,
  collectNFT,
  isLoading,
  collectMarket,
  isSuccess,
  loading,
  data
}): JSX.Element => {
  const { setShowApproval, approved } = useContext(CollectContext);
  const { isConnected } = useAccount();

  useEffect(() => {
    console.log("rerun in collect")
  }, [data, collectMarket])

  let action = "APPROVE";

  const decideStringAction = () => {
    if (errorMessage && isConnected) {
      console.log("ERROR");
      action = "ERROR";
    }

    if (!isConnected && !errorMessage) {
      console.log("NOT_CONNECTED");
      action = "NOT_CONNECTED";
    }

    if (isConnected && !errorMessage && !approved && !isSuccess) {
      console.log("APPROVE");
      action = "APPROVE";
    }

    if (
      isConnected &&
      !errorMessage &&
      approved &&
      token[0].type === "collection"
    ) {
      console.log("COLLECTION");
      action = "COLLECTION";
    }

    if (
      isConnected &&
      !errorMessage &&
      approved &&
      token[0].type === "market"
    ) {
      console.log("MARKET");
      action = "MARKET";
    }

    return action;
  };

  switch (decideStringAction()) {
    case "ERROR":
      return (
        <div className="relative w-28 h-10 row-start-1 font-firaL text-5xl text-black grid grid-flow-col auto-cols-[auto auto] border-2 border-black grid grid-flow-col auto-cols-[auto auto] p-1 bg-blue-500">
          <div className="col-start-1 relative w-fit h-fit text-[3vw] galaxy:text-[2.2vw] sm:text-[1.6vw] md:text-[1.3vw] lg:text-[1vw] xl:text-[0.8vw] font-fira place-self-center text-white text-center">
            INSUFFICIENT FUNDS{" "}
          </div>
        </div>
      );

    case "NOT_CONNECTED":
      return (
        <div
          className="relative w-28 h-10 row-start-1 font-firaL text-5xl text-black grid grid-flow-col auto-cols-[auto auto] border-2 border-black grid grid-flow-col auto-cols-[auto auto] p-1 bg-green-500"
          onClick={() => {
            if (connect.current) {
              connect.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
        >
          <div className="col-start-1 relative w-fit h-fit text-[3vw] galaxy:text-[2.2vw] sm:text-[1.6vw] md:text-[1.3vw] lg:text-[1vw] xl:text-[0.8vw] font-fira place-self-center text-white text-center">
            CONNECT WALLET{" "}
          </div>
        </div>
      );

    case "COLLECTION":
      return (
        <div
          className="relative w-28 h-10 row-start-1 font-firaL text-5xl text-black grid grid-flow-col auto-cols-[auto auto] border-2 border-black grid grid-flow-col auto-cols-[auto auto] p-1 hover:bg-midBlue hover:cursor-empireS active:scale-95"
          onClick={() => {
            collectNFT();
          }}
        >
          <div className="col-start-1 relative w-fit h-fit hover:opacity-70 text-base font-fira place-self-center pr-2">
            {(!isLoading && !isSuccess && !loading && "COLLECT ") ||
              (isSuccess && "SUCCESS ") ||
              ((isLoading || loading) && !isSuccess && (
                <div className="relative w-fit h-fit animate-spin">
                  <AiOutlineLoading color="#131313" />
                </div>
              ))}
          </div>
          <div className="col-start-2 w-4 h-4 relative w-fit h-fit place-self-center">
            <Image
              src="/images/expand2.png"
              layout="fill"
              alt="Expand"
              priority
            />
          </div>
        </div>
      );

    case "MARKET":
      return (
        <div
          className="relative w-28 h-10 row-start-1 font-firaL text-5xl text-black grid grid-flow-col auto-cols-[auto auto] border-2 border-black grid grid-flow-col auto-cols-[auto auto] p-1 hover:bg-midBlue hover:cursor-empireS active:scale-95"
          onClick={() => collectMarket()}
        >
          <div className="col-start-1 relative w-fit h-fit hover:opacity-70 text-base font-fira place-self-center pr-2">
            {(!isLoading && !isSuccess && !loading && "COLLECT ") ||
              (isSuccess && "SUCCESS ") ||
              ((isLoading || loading) && !isSuccess && (
                <div className="relative w-fit h-fit animate-spin">
                  <AiOutlineLoading color="#131313" />
                </div>
              ))}
          </div>
          <div className="col-start-2 w-4 h-4 relative w-fit h-fit place-self-center">
            <Image
              src="/images/expand2.png"
              layout="fill"
              alt="Expand"
              priority
            />
          </div>
        </div>
      );

    default:
      return (
        <div
          className="relative w-28 h-10 row-start-1 font-firaL text-5xl text-black grid grid-flow-col auto-cols-[auto auto] border-2 border-black grid grid-flow-col auto-cols-[auto auto] p-1 hover:bg-midBlue hover:cursor-empireS active:scale-95"
          onClick={() => setShowApproval(true)}
        >
          <div className="col-start-1 relative w-fit h-fit hover:opacity-70 text-base font-fira place-self-center pr-2">
            COLLECT{" "}
          </div>
          <div className="col-start-2 w-4 h-4 relative w-fit h-fit place-self-center">
            <Image
              src="/images/expand2.png"
              layout="fill"
              alt="Expand"
              priority
            />
          </div>
        </div>
      );
  }
};

export default Collect;
