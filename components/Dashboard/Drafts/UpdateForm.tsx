import { FormEvent, FunctionComponent, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosSave } from "react-icons/io";
import moment from "moment";
import { DraftFormUpdateProps } from "../../../types/general.types";

const UpdateForm: FunctionComponent<DraftFormUpdateProps> = ({
  showImages,
  hashImageStringOne,
  imagesArray,
  handleDraftUpdate,
  draft,
}): JSX.Element => {
  useEffect(() => {}, [draft]);
  return (
    <form
      className="relative w-full h-full grid grid-flow-col auto-cols-[auto auto] gap-20"
      onSubmit={(e: FormEvent) => handleDraftUpdate(e)}
    >
      <div className="relative w-full h-full col-start-1 grid grid-flow-col auto-cols-[auto auto] bg-grayBlue p-8 gap-4">
        <div className="relative w-full h-fit row-start-1 grid grid-flow-col auto-cols-[auto auto] col-start-1 gap-6">
          <div className="relative w-full h-fit col-start-1 place-self-center pr-16 text-black text-base">
            {moment().format("MM/D hh:mm:ss")}
          </div>
          <div className="relative w-full h-fit col-start-2 place-self-center cursor-pointer grid grid-flow-col auto-cols-[auto auto] gap-2 pr-4">
            <div className="relative w-fit h-fit col-start-1 place-self-center cursor-pointer">
              <RiDeleteBin5Fill
                size={15}
                color="black"
                className="hover:scale-90 active:scale-90"
              />
            </div>
            <button
              className="relative w-fit h-fit col-start-2 place-self-center cursor-pointer"
              type="submit"
            >
              <IoIosSave
                size={15}
                color="black"
                className="hover:scale-90 active:scale-90"
              />
            </button>
          </div>
          <input
            key={draft?.title}
            name="productTitle"
            placeholder="Product Title"
            required
            type={"text"}
            defaultValue={draft?.title}
            className={`relative col-start-3 w-80 h-fit text-black font-economica px-2 bg-grayBlue border-black border-2 py-3 justify-self-end`}
            //   disabled={success || addMutation.isLoading ? true : false}
          />
        </div>
        <div className="relative w-full h-full row-start-2 grid grid-flow-col auto-cols-[auto auto]">
          <textarea
            key={draft?.description}
            name="description"
            defaultValue={draft?.description}
            placeholder={"Product Description / Details"}
            className={`relative col-start-1 w-full h-[50vw] text-black font-economica px-2 bg-grayBlue border-black border-2 py-3 align-top text-start`}
            // disabled={success || addMutation.isLoading ? true : false}
          />
        </div>
      </div>
      <div className="relative w-fit h-fit col-start-2 grid grid-flow-row auto-rows-[auto auto]">
        <span className="relative w-80 h-60 font-economica text-lg grid grid-flow-col auto-cols-[auto auto] border-white/50 border-2 border-dashed row-start-1">
          <div
            className="relative w-fit h-fit col-start-1 grid grid-flow-col auto-cols-[auto auto] bg-grayBlue place-self-center px-10 py-1 cursor-pointer hover:scale-105 active:scale-95"
            // onClick={() => dispatch(setDrop({ actionValue: "DROP_TYPES_ADD" }))}
          >
            <label
              className="relative w-fit h-fit p-2 place-self-end rounded-sm bg-grayBlue cursor-pointer active:scale-95 p-2"
              onChange={(e: FormEvent) => {
                showImages(e);
                hashImageStringOne(e);
              }}
            >
              <div className="relative w-fit h-fit col-start-1 place-self-center text-black">
                add product image
              </div>
              <input
                type="file"
                hidden
                id="files"
                multiple={false}
                name="featuredImages"
                // disabled={
                //   productSuccess || imageUploading || addMutation.isLoading
                //     ? true
                //     : false
                // }
              />
            </label>
          </div>
        </span>
        {imagesArray && (
          <div className="relative w-fit h-fit row-start-2 grid grid-cols-4 auto-rows-auto place-self-center pt-10 gap-4"></div>
        )}
      </div>
    </form>
  );
};

export default UpdateForm;
