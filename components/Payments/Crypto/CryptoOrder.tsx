import { FunctionComponent } from "react";
import Flow from "./Flow";
import useFlow from "./hooks/useFlow";

const CryptoOrders: FunctionComponent = (): JSX.Element => {
  return (
    <div className="w-full h-fit relative grid grid-flow-row auto-rows-[auto auto] gap-4">
      <div className="row-start-1 relative w-full h-fit bg-lBlue p-3 border-2 border-white text-white cursor-pointer active:scale-95 rounded-md py-4 grid grid-flow-col auto-cols-[auto auto]">
        <Flow />
      </div>
    </div>
  );
};

export default CryptoOrders;
