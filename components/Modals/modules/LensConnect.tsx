import { FunctionComponent } from "react";
import { ImCross } from "react-icons/im";
import { AiOutlineLoading } from "react-icons/ai";
import { setLensConnectModal } from "../../../redux/reducers/lensConnectModalSlice";
import { LensConnectProps } from "../types/modals.types";

const LensConnect: FunctionComponent<LensConnectProps> = ({
  dispatch,
  handleLensSignIn,
  loginLoading,
  connected,
}): JSX.Element => {
  return (
    <div className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-empireS">
      <div className="relative w-[90vw] sm:w-[50vw] half:w-[30vw] h-fit max-h-[90vh] place-self-center bg-lightWhite rounded-lg border border-black rounded-sm overflow-y-scroll">
        <div className="relative w-full h-full flex flex-col gap-5 p-2">
          <div className="relative w-fit h-fit items-end justify-end ml-auto flex cursor-pointer">
            <ImCross
              color="black"
              size={10}
              onClick={() =>
                !loginLoading && dispatch(setLensConnectModal(false))
              }
            />
          </div>
          <div className="relative w-full h-fit items-center justify-center flex flex-col gap-3 pb-4">
            <div className="relative w-2/3 h-fit items-center justify-center text-center break-words font-din text-black text-base">
              Connect to Lens Protocol.
            </div>
            <div
              className={`relative font-din h-8 w-28 px-2 py-1 flex items-center bg-lightYellow justify-center text-black text-sm border border-black ${
                !loginLoading && !connected && "cursor-empireS"
              } ${connected && "opacity-70"}`}
              onClick={() => !loginLoading && !connected && handleLensSignIn()}
            >
              <div
                className={`relative flex items-center justify-center ${
                  loginLoading && "animate-spin"
                }`}
              >
                {loginLoading ? (
                  <AiOutlineLoading size={15} color={"black"} />
                ) : !connected ? (
                  "Connect"
                ) : (
                  "Connected"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LensConnect;
