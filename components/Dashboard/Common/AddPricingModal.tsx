import { FunctionComponent } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { AddPricingModalProps } from "../../../types/general.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const AddPricingModal: FunctionComponent<AddPricingModalProps> = ({
  handleDropAddPrice,
  setAddPricingModal,
}): JSX.Element => {
  return (
    <div className="absolute flex items-center justify-center fixed w-full h-full z-30 bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-96 h-80 place-self-center bg-lBlue border-2 border-black grid grid-flow-row auto-rows-[auto auto]">
        <div className="relative w-fit h-fit row-start-1 justify-self-end p-4">
          <AiFillCloseSquare
            color="white"
            onClick={() => setAddPricingModal(false)}
            className="cursor-pointer active:scale-95"
          />
        </div>
        <div className="relative w-1/2 text-center h-fit text-white font-economica row-start-2 justify-self-center text-2xl">
          You're product won't be live until you add pricing. Would you like to
          add pricing now?
        </div>
        <div className="relative w-fit h-fit text-white font-economica row-start-3 grid grid-flow-col auto-cols-[auto auto] justify-self-center gap-3 pb-10 pt-4">
          <div
            className="relative w-fit h-fit border-2 border-white px-7 py-1.5 grid grid-flow-col auto-cols-[auto auto] col-start-1 hover:opacity-70 active:scale-95 cursor-pointer"
            onClick={() => handleDropAddPrice()}
          >
            <div className="relative w-fit h-fit place-self-center">Yes</div>
          </div>
          <div
            className="relative w-fit h-fit border-2 border-white px-3 py-1.5 grid grid-flow-col auto-cols-[auto auto] col-start-2 hover:opacity-70 active:scale-95 cursor-pointer"
            onClick={() => setAddPricingModal(false)}
          >
            No, Later
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPricingModal;
