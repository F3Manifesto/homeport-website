import { FormEvent, FunctionComponent, useEffect } from "react";
import { AiFillBackward, AiOutlineLoading } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setDrop } from "../../../redux/reducers/dropSlice";
import { UpdateDropTypeProps } from "./../../../types/general.types";

const UpdateDrop: FunctionComponent<UpdateDropTypeProps> = ({
  handleDropSubmitUpdate,
  updatedMutation,
  success,
  setSuccess,
  data,
}): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }
  }, [success]);
  return (
    <div className="relative col-start-2 w-full h-fit grid grid-flow-row auto-rows-[auto auto] py-8">
      <div
        className="row-start-1 text-mainText font-economica h-fit w-fit opacity-80 hover:opacity-20 cursor-pointer"
        onClick={() => {
          dispatch(setDrop("DROP_TYPES"));
        }}
      >
        <AiFillBackward
          color="white"
          size={25}
          className="float-left mr-2 pt-1"
        />{" "}
        Return
      </div>
      <div className="relative w-fit h-fit pt-4 text-white font-economicaB row-start-2 text-3xl">
        UPDATE DROP TYPE
      </div>
      <form
        className="relative w-full h-full row-start-3 pt-10 grid grid-flow-row auto-rows-[auto auto] gap-10"
        onSubmit={(e: FormEvent) => handleDropSubmitUpdate(e)}
      >
        <div className="relative w-full h-full grid grid-flow-row auto-rows-[auto auto] gap-3 row-start-1">
          <div className="relative row-start-1 w-fit h-fit text-white font-economica text-left">
            Drop Type Title
          </div>
          <input
            defaultValue={data?.title}
            name="dropTypeTitle"
            className={`relative row-start-2 w-96 h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 ${
              (success || updatedMutation.isLoading) && "opacity-70"
            }`}
            required
            disabled={success || updatedMutation.isLoading ? true : false}
          />
        </div>
        <div className="relative w-full h-full grid grid-flow-row auto-rows-[auto auto] gap-3 row-start-2">
          <div className="relative row-start-1 w-fit h-fit text-white font-economica text-left">
            Drop Type Description
          </div>
          <textarea
            defaultValue={data?.description}
            name="dropTypeDescription"
            className={`relative row-start-2 w-96 h-60 text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 align-top text-start ${
              (success || updatedMutation.isLoading) && "opacity-70"
            }`}
            required
            disabled={success || updatedMutation.isLoading ? true : false}
          />
        </div>
        {updatedMutation.isLoading ? (
          <div className="relative w-full h-10 row-start-3 bg-grayBlue px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto]">
            <div className="relative w-fit h-fit place-self-center text-black font-economicaB animate-spin">
              <AiOutlineLoading size={5} color={"white"} />
            </div>
          </div>
        ) : updatedMutation.isError ? (
          <button
            className="relative w-full h-10 row-start-3 bg-grayPink px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto] hover:scale-95 active:scale-95 hover:opacity-80 cursor-pointer"
            type="submit"
          >
            <div className="relative w-fit h-fit place-self-center text-black font-economicaB">
              ERROR, TRY AGAIN
            </div>
          </button>
        ) : success ? (
          <div className="relative w-full h-10 row-start-3 bg-grayGreen px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto]">
            <div className="relative w-fit h-fit place-self-center text-black font-economicaB">
              SUCCESS
            </div>
          </div>
        ) : (
          <button
            className="relative w-full h-10 row-start-3 bg-grayBlue px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto] hover:scale-95 active:scale-95 hover:opacity-80 cursor-pointer"
            type="submit"
          >
            <div className="relative w-fit h-fit place-self-center text-black font-economicaB">
              UPDATE DROP TYPE
            </div>
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdateDrop;
