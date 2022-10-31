import { FunctionComponent, useEffect } from "react";
import useApprove from "./hooks/useApprove";

const Approve: FunctionComponent = (): JSX.Element => {
  const { prepareApproval, approveAddress } = useApprove();
  useEffect(() => {
    prepareApproval();
  });
  return (
    <div className="z-50 bg-blur relative w-full h-full flex">
      <div className="relative w-fit h-fit bg-offBlack grid grid-flow-row auto-rows-[auto auto]">
        <div className="relative w-fit h-fit place-self-center row-start-1 text-white text-lg font-jacklane text-center">
          Approve Tokens
        </div>
        <div className="relative w-fit h-fit place-self-center row-start-1 text-white text-base font-jacklane text-center">
          Approve your tokens to spend.
        </div>
        <div
          className="w-fit h-fit row-start-3 relative text-white grid grid-flow-col auto-cols-[auto auto] place-self-center p-2 font-fira border-2 border-offWhite hover:bg-midBlue hover:cursor-empireS active:scale-95"
          onClick={() => approveAddress()}
        >
          <div className="relative w-fit h-fit place-self-center col-start-1">
            Approve
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approve;
