import { FormEvent, FunctionComponent, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosSave } from "react-icons/io";
import moment from "moment";
import { DraftFormProps } from "../../../types/general.types";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch } from "react-redux";

const Form: FunctionComponent<DraftFormProps> = ({
  handleDraftSubmit,
  hashImageStringDraft,
  imagesArray,
  imageDraftUploading,
  success,
  setSuccess,
  handleRemoveImage,
}): JSX.Element => {
  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  }, [success]);
  const dispatch = useDispatch();
  return (
    <form
      className="relative w-full h-full grid grid-flow-col auto-cols-[auto auto] gap-20"
      onSubmit={(e: FormEvent) => handleDraftSubmit(e)}
    >
      <div className="relative w-full h-full col-start-1 grid grid-flow-col auto-cols-[auto auto] bg-grayBlue p-8 gap-4">
        <div className="relative w-full h-fit row-start-1 grid grid-flow-col auto-cols-[auto auto] gap-6 col-start-1">
          <div className="relative w-full h-fit col-start-1 place-self-center pr-16 text-black text-base">
            {moment().format("MM/D hh:mm:ss")}
          </div>
          <div className="relative w-full h-fit col-start-2 place-self-center cursor-pointer grid grid-flow-col auto-cols-[auto auto] gap-2 pr-10">
            <button
              className="relative w-fit h-fit col-start-1 place-self-center cursor-pointer"
              type="submit"
            >
              <IoIosSave
                size={15}
                color={success ? "#ADE7B5" : "black"}
                className="hover:scale-90 active:scale-90"
              />
            </button>
          </div>
          <input
            name="productTitle"
            placeholder="Product Title"
            required
            className={`relative col-start-3 w-80 h-fit text-black font-economica px-2 bg-grayBlue border-black border-2 py-3`}
            disabled={success ? true : false}
          />
        </div>
        <div className="relative w-full h-full row-start-2 grid grid-flow-col auto-cols-[auto auto]">
          <textarea
            name="description"
            placeholder={"Product Description / Details"}
            className={`relative col-start-1 w-full h-[50vw] max-h-full text-black font-economica px-2 bg-grayBlue border-black border-2 py-3 align-top text-start`}
            disabled={success ? true : false}
          />
        </div>
      </div>
      <div className="relative w-full h-fit max-h-[60vw] overflow-y-scroll col-start-2 grid grid-flow-row auto-rows-[auto auto]">
        <span className="relative w-80 h-60 font-economica text-lg grid grid-flow-col auto-cols-[auto auto] border-white/50 border-2 border-dashed row-start-1">
          <div
            className="relative w-fit h-fit col-start-1 grid grid-flow-col auto-cols-[auto auto] bg-grayBlue place-self-center px-10 py-1 cursor-pointer hover:scale-105 active:scale-95"
            // onClick={() => dispatch(setDrop({ actionValue: "DROP_TYPES_ADD" }))}
          >
            <label
              className="relative w-fit h-fit p-2 place-self-end rounded-sm bg-grayBlue cursor-pointer active:scale-95 p-2"
              onChange={(e: FormEvent) => {
                hashImageStringDraft(e);
              }}
            >
              <div
                className={`relative w-fit h-fit col-start-1 place-self-center text-black ${
                  imageDraftUploading && "animate-spin"
                }`}
              >
                {imageDraftUploading ? (
                  <AiOutlineLoading size={20} color={"black"} />
                ) : (
                  "add product image"
                )}
              </div>
              <input
                type="file"
                accept="image/png"
                hidden
                id="files"
                multiple={false}
                name="featuredImages"
                disabled={imageDraftUploading || success ? true : false}
              />
            </label>
          </div>
        </span>
        {imagesArray && (
          <div className="relative w-fit h-fit row-start-2 grid grid-flow-row auto-rows-auto place-self-center pt-10 gap-4">
            {imagesArray.map((image: string, index: number) => {
              return (
                <div
                  className={`relative w-80 h-60 row-start-${
                    index + 1
                  } cursor-pointer bg-black grid grid-flow-col auto-cols-[auto auto] group`}
                  key={index}
                >
                  <img
                    src={`https://${image}.ipfs.w3s.link`}
                    className="absolute object-cover w-full h-full col-start-1"
                  />
                  {
                    <div className="absolute group-hover:visible invisible bg-black w-full h-full bg-opacity-80 grid grid-flow-col auto-cols-[auto auto]">
                      <div className="col-start-1 relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-5 place-self-center">
                        <div className="relative w-fit h-fit col-start-1 place-self-center">
                          <RiDeleteBin5Fill
                            size={25}
                            color="white"
                            className="hover:scale-90 active:scale-90"
                            onClick={() => handleRemoveImage(image)}
                          />
                        </div>
                      </div>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
};

export default Form;
