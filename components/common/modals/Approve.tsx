import { FunctionComponent, useEffect } from "react";
import useApprove from "./hooks/useApprove";
import { ImCross } from "react-icons/im";
import { AiOutlineLoading } from "react-icons/ai";
import { ApproveProps } from "../../../types/general.types";

const Approve: FunctionComponent<ApproveProps> = ({
  setShowApproval,
}): JSX.Element => {
  const { prepareApproval, approveAddress, isLoading, res } = useApprove();
  useEffect(() => {
    prepareApproval();
  }, []);
  return (
    <div className="relative w-full galaxy:w-96 h-fit bg-offBlack grid grid-flow-row auto-rows-[auto auto] col-start-1 p-4 gap-4">
      <div
        className="relative place-self-end w-6 h-6 row-start-1 cursor-empireS hover:opacity-80 active:scale-95 grid grid-flow-row auto-rows-[auto auto]"
        onClick={() => setShowApproval(false)}
      >
        <ImCross
          color="white"
          className="place-self-center w-fit h-fit relative row-start-1"
        />
      </div>
      <div className="relative w-fit h-fit place-self-center row-start-2 text-white text-2xl font-jacklane text-center pb-4">
        Approve Tokens
      </div>
      <div className="relative w-fit h-fit place-self-center row-start-3 text-white text-base font-jacklane text-center pb-4">
        Approve your tokens to spend.
      </div>
      <div
        className={`w-24 h-12 row-start-4 relative text-white grid grid-flow-col auto-cols-[auto auto] place-self-center p-2 font-fira border-2 border-offWhite hover:bg-midBlue hover:cursor-empireS active:scale-95 ${
          res && "active:scale-0 opacity-60"
        }`}
        onClick={() => approveAddress()}
      >
        <div className="relative w-fit h-fit place-self-center col-start-1">
          {isLoading || res === false ? (
            <div className="relative w-fit h-fit animate-spin">
              <AiOutlineLoading color="white" />
            </div>
          ) : res ? (
            "Success"
          ) : (
            "Approve"
          )}
        </div>
      </div>
    </div>
  );
};

export default Approve;
