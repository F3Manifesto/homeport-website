import { FunctionComponent } from "react";
import Flow from "./Flow";

const CryptoOrders: FunctionComponent = (): JSX.Element => {
  return (
    <div className="w-full h-fit relative grid grid-flow-row auto-rows-[auto auto] gap-4">
      <div className="row-start-1 relative w-fit h-fit bg-lBlue p-3 border-2 border-white text-white cursor-pointer active:scale-95 rounded-md">
        <Flow />
      </div>
    </div>
  );
};

export default CryptoOrders;
