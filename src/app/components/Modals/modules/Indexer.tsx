import { ModalContext } from "@/app/providers";
import { FunctionComponent, JSX, useContext } from "react";

const Indexer: FunctionComponent = (): JSX.Element => {
  const context = useContext(ModalContext);

  return (
    <div className="fixed bottom-5 right-5 w-fit h-fit z-50">
      <div className="w-fit h-10 sm:h-16 flex items-center justify-center border border-black bg-lightYellow">
        <div className="relative w-fit h-fit flex items-center justify-center px-4 py-2 text-xs sm:text-base text-black font-din">
          {context?.indexar}
        </div>
      </div>
    </div>
  );
};

export default Indexer;
