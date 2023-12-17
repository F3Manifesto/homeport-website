import { FunctionComponent } from "react";
import { ImCross } from "react-icons/im";
import { AiOutlineLoading } from "react-icons/ai";
import { setReactBox } from "../../redux/reducers/reactBoxSlice";
import Image from "next/image";
import { INFURA_GATEWAY } from "../../lib/constants";
import { WhoProps } from "../../types/general.types";
import WhoSwitch from "./modules/WhoSwitch";

const Who: FunctionComponent<WhoProps> = ({
  dataLoading,
  reactors,
  quoters,
  hasMore,
  hasMoreQuote,
  showMore,
  mirrorQuote,
  setMirrorQuote,
  type,
  router,
  dispatch,
  lensConnected,
}): JSX.Element => {
  return (
    <div className="inset-0 justify-center fixed z-20 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto">
      <div className="relative w-full w-[90vw] sm:w-[70vw] tablet:w-[60vw] min-w-fit px-2 md:w-[40vw] lg:w-[25vw] h-fit col-start-1 place-self-center bg-offBlack border border-white">
        <div className="relative w-full row-start-2 h-fit grid grid-flow-col auto-cols-auto">
          <div className="relative w-full h-full col-start-1 place-self-center">
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 pb-8">
              <div className="relative w-fit h-fit items-end justify-end ml-auto pr-3 pt-3 cursor-pointer flex">
                <ImCross
                  color="white"
                  size={10}
                  onClick={() => {
                    dispatch(
                      setReactBox({
                        actionOpen: false,
                      })
                    );
                    setMirrorQuote(false);
                  }}
                />
              </div>
              {type === "Mirrors" &&
                (reactors?.length > 0 || quoters?.length > 0) && (
                  <div className="relative w-full h-fit flex items-center justify-center flex-row gap-2">
                    <div
                      className={`relative w-5 h-5 flex items-center justify-center hover:opacity-70 cursor-pointer ${
                        !mirrorQuote && "opacity-50"
                      }`}
                      onClick={() => setMirrorQuote(true)}
                      title="Quotes"
                    >
                      <Image
                        layout="fill"
                        src={`${INFURA_GATEWAY}/ipfs/QmfDNH347Vph4b1tEuegydufjMU2QwKzYnMZCjygGvvUMM`}
                        draggable={false}
                      />
                    </div>
                    <div
                      className={`relative w-5 h-5 flex items-center justify-center hover:opacity-70 cursor-pointer ${
                        mirrorQuote && "opacity-50"
                      }`}
                      onClick={() => setMirrorQuote(false)}
                      title="Mirrors"
                    >
                      <Image
                        layout="fill"
                        src={`${INFURA_GATEWAY}/ipfs/QmPRRRX1S3kxpgJdLC4G425pa7pMS1AGNnyeSedngWmfK3`}
                        draggable={false}
                      />
                    </div>
                  </div>
                )}

              {!dataLoading ? (
                <WhoSwitch
                  router={router}
                  lensConnected={lensConnected}
                  type={type}
                  reactors={reactors}
                  quoters={quoters}
                  hasMore={hasMore}
                  hasMoreQuote={hasMoreQuote}
                  showMore={showMore}
                  mirrorQuote={mirrorQuote}
                  dispatch={dispatch}
                />
              ) : (
                <div className="relative w-[40vw] md:w-full h-60 grid grid-flow-col auto-cols-auto">
                  <div className="relative w-fit h-fit col-start-1 place-self-center animate-spin">
                    <AiOutlineLoading color="white" size={20} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Who;
