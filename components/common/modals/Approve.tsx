import { FunctionComponent, useContext, useEffect } from "react";
import useApprove from "./hooks/useApprove";
import { ImCross } from "react-icons/im";
import { AiOutlineLoading } from "react-icons/ai";
import { CollectContext } from "../../../pages/collect/[name]";

const Approve: FunctionComponent = (): JSX.Element => {
  const { prepareApproval, approveAddress, isLoading, isSuccess, loading } =
    useApprove();
  useEffect(() => {
    prepareApproval();
  }, []);
  const { setShowApprovalModal } = useContext(CollectContext);
  return (
    <div className="relative w-full galaxy:w-96 h-fit bg-offBlack grid grid-flow-row auto-rows-auto col-start-1 p-4 gap-4">
      <div
        className="relative place-self-end w-10 h-10 row-start-1 cursor-empireS hover:opacity-80 active:scale-95 grid grid-flow-row auto-rows-auto"
        onClick={() => {
          setShowApprovalModal(false);
        }}
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
      <button
        className={`w-24 h-12 row-start-4 relative text-white grid grid-flow-col auto-cols-auto place-self-center p-2 font-fira border-2 border-offWhite hover:bg-midBlue hover:cursor-empireS active:scale-95 ${
          isSuccess && "active:scale-100 hover:bg-offBlack hover:cursor-empireA"
        }`}
        disabled={isSuccess}
        onClick={() => approveAddress()}
      >
        <div className="relative w-fit h-fit place-self-center col-start-1">
          {(!isLoading && !isSuccess && !loading && "Approve") ||
            (isSuccess && "Success") ||
            ((isLoading || loading) && !isSuccess && (
              <div className="relative w-fit h-fit animate-spin">
                <AiOutlineLoading color="white" />
              </div>
            ))}
        </div>
      </button>
    </div>
  );
};

export default Approve;
