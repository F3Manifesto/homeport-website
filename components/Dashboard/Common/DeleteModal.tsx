import { FunctionComponent } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { DeleteModalProps } from "../../../types/general.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
  setDeleteModal,
  handleDropDelete,
  handleProductDelete,
  handleAdminDelete,
  modalTop,
}): JSX.Element => {
  const displayType = useSelector(
    (state: RootState) => state.app.dashReducer.value
  );
  return (
    <div className="absolute flex items-center justify-center fixed w-full h-full z-30 bg-opacity-50 backdrop-blur-sm">
      <div
        className="relative w-96 h-80 place-self-center bg-lBlue border-2 border-black grid grid-flow-row auto-rows-[auto auto]"
        ref={modalTop}
      >
        <div className="relative w-fit h-fit row-start-1 justify-self-end p-4">
          <AiFillCloseSquare
            color="white"
            onClick={() => setDeleteModal(false)}
            className="cursor-pointer active:scale-95"
          />
        </div>
        <div className="relative w-1/2 text-center h-fit text-white font-economica row-start-2 justify-self-center text-2xl">
          {displayType === "DROP_TYPES"
            ? "Are you sure you&apos;d like to delete this drop type?"
            : displayType === "INVENTORY"
            ? "Are you sure you&apos;d like to delete this product?"
            : displayType === "ADMIN" &&
              "Are you sure you&apos;d like to delete this admin?"}
        </div>
        <div className="relative w-fit h-fit text-white font-economica row-start-3 grid grid-flow-col auto-cols-[auto auto] justify-self-center">
          <div
            className="relative w-fit h-fit border-2 border-white px-10 py-1.5 grid grid-flow-col auto-cols-[auto auto] col-start-1 hover:opacity-70 active:scale-95 cursor-pointer"
            onClick={
              displayType === "DROP_TYPES"
                ? () => handleDropDelete()
                : displayType === "INVENTORY"
                ? () => handleProductDelete()
                : () => handleAdminDelete()
            }
          >
            <div className="relative w-fit h-fit place-self-center">Yes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
