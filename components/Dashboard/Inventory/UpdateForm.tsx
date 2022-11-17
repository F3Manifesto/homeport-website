import { FormEvent, FunctionComponent, useEffect } from "react";
import { DropInterface, UpdateFormProps } from "../../../types/general.types";
import lodash from "lodash";
import Image from "next/legacy/image";
import { TbPlus } from "react-icons/tb";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setDropType } from "../../../redux/reducers/dropTypeSlice";
import { setDrop } from "../../../redux/reducers/dropSlice";
import { RootState } from "../../../redux/store";

const UpdateForm: FunctionComponent<UpdateFormProps> = ({
  success,
  setSuccess,
  handleProductSubmitUpdate,
  openDropDown,
  setOpenDropDown,
  data,
  dropTypeName,
  dropFormat,
  showFileMainImage,
  updatedMutation,
  featuredFiles,
  mainFile,
  updatedProductData,
  newDropFormatArray,
  handleExistingDropFormatArray,
  handleDispatchFormatArray,
  hashImageStringOneUpdated,
  hashImageStringMultipleUpdated,
  imageUploadingUpdated,
}): JSX.Element => {
  const dispatch = useDispatch();
  const dropFormatArray = useSelector(
    (state: RootState) => state.app.dropFormatReducer.value
  );
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        setTimeout(() => {
          dispatch(
            setDrop({
              actionValue: "INVENTORY_ADD",
              actionId: undefined,
            })
          );
        }, 3000);
      }, 4000);
    }
  }, [success]);
  return (
    <form
      className="relative w-full h-full row-start-3 pt-10 grid grid-flow-row auto-rows-[auto auto] gap-10"
      onSubmit={(e: FormEvent) => handleProductSubmitUpdate(e)}
    >
      <div className="relative w-full h-full grid grid-flow-row auto-rows-[auto auto] gap-3 row-start-1">
        <div className="relative row-start-1 w-fit h-fit text-white font-economica text-left">
          Product Name
        </div>
        <input
          name="productName"
          defaultValue={updatedProductData?.name}
          maxLength={50}
          className={`relative row-start-2 w-[30vw] h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          disabled={success || updatedMutation.isLoading ? true : false}
        />
      </div>
      <div className="relative w-full h-full grid grid-flow-row auto-rows-[auto auto] gap-3 row-start-2">
        <div className="relative row-start-1 w-fit h-fit text-white font-economica text-left">
          Product Description
        </div>
        <textarea
          defaultValue={updatedProductData?.description}
          name="productDescription"
          className={`relative row-start-2 w-full h-96 text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 align-top text-start`}
          required
          disabled={success || updatedMutation.isLoading ? true : false}
        />
      </div>
      <div className="relative max-w-full h-full grid grid-flow-row auto-rows-[auto auto] row-start-3 gap-10">
        <div className="relative w-full h-fit grid grid-flow-row auto-rows-[auto auto] gap-3 col-start-1 row-start-1">
          <div className="relative row-start-1 w-fit h-fit text-white font-economica text-left">
            Drop Type
          </div>
          <div
            className="relative w-full row-start-2 h-16"
            onClick={() => setOpenDropDown(!openDropDown)}
          >
            <div
              className={`w-full z-10 overflow-y-scroll absolute bg-shaded border-white border-2 rounded-md cursor-pointer text-white font-economica ${
                openDropDown ? "h-52" : "h-fit"
              }`}
            >
              {(openDropDown ? data : lodash.slice(data, 0, 1)).map(
                (type: DropInterface, index: number) => {
                  return (
                    <div
                      className="relative w-full h-fit py-2 bg-shaded hover:bg-grayBlue px-2 py-3 active:bg-yellowTheme"
                      key={index}
                      onClick={() => dispatch(setDropType(type.title))}
                    >
                      {dropTypeName === "Select Drop Type" &&
                      updatedProductData?.dropType
                        ? updatedProductData?.dropType
                        : dropTypeName !== "Select Drop Type" && openDropDown
                        ? type.title
                        : dropTypeName}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit grid grid-flow-row auto-rows-[auto auto] gap-1 col-start-1 row-start-2">
          <div className="relative row-start-1 w-fit h-fit text-white font-economica text-left">
            Drop Format
          </div>
          <div className="relative w-[30vw] h-fit row-start-2 text-white font-economica px-2 py-3 cursor-pointer flex flex-wrap justify-start">
            {dropFormat.map((format: string, index: number) => {
              return (
                <div
                  className="relative w-fit h-fit px-1 py-2 grid grid-flow-col auto-cols-[auto auto] gap-4"
                  key={index}
                >
                  <div
                    className={`cursor-pointer appearance-none bg-white border border-white h-4 w-4 float-left col-start-1 place-self-center ${
                      (newDropFormatArray?.includes(format) ||
                        dropFormatArray?.includes(format)) &&
                      "bg-yellowTheme"
                    }`}
                    onClick={
                      dropFormatArray?.length !== 0
                        ? () => handleDispatchFormatArray(format)
                        : () => handleExistingDropFormatArray(format)
                    }
                  ></div>
                  <div className="col-start-2 relative w-fit h-fit">
                    {format}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative w-full h-full row-start-4 grid grid-flow-row auto-rows-[auto auto] gap-3">
        <div className="relative row-start-1 w-fit h-fit text-white font-economica text-left">
          Quantity
        </div>
        <input
          name="quantity"
          type={"number"}
          min={0}
          defaultValue={updatedProductData?.quantity}
          className={`relative row-start-2 w-[30vw] h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          disabled={success || updatedMutation.isLoading ? true : false}
        />
      </div>
      <div className="relative gap-6 w-full h-full row-start-5 grid grid-flow-col auto-cols-[auto auto] pt-10">
        <div className="relative w-full h-48 col-start-1 border-2 border-white grid grid-flow-row auto-rows-[auto auto]">
          {mainFile ? (
            <Image
              src={URL.createObjectURL(mainFile as MediaSource)}
              layout="fill"
              objectFit="cover"
              className="absolute w-full h-full"
            />
          ) : (
            updatedProductData?.mainImage &&
            !mainFile && (
              <img
                src={`https://${updatedProductData?.mainImage}.ipfs.w3s.link`}
                className="w-full h-full absolute object-cover"
              />
            )
          )}
          <div className="relative w-fit h-fit self-end justify-self-center row-start-1 text-white text-economica px-4">
            add main image
          </div>
          <div className="relative w-fit h-fit p-2 place-self-end row-start-2 grid grid-flow-col auto-cols-[auto auto]">
            <label
              className="relative w-fit h-fit p-2 place-self-end rounded-sm bg-grayBlue cursor-pointer active:scale-95 p-2"
              onChange={(e: FormEvent) => {
                showFileMainImage(e, "MainImage");
                hashImageStringOneUpdated(e);
              }}
            >
              <TbPlus size={25} color="black" />
              <input
                type="file"
                accept="image/png"
                hidden
                id="files"
                multiple={false}
                name="mainImage"
                disabled={
                  success || imageUploadingUpdated || updatedMutation.isLoading
                    ? true
                    : false
                }
              />
            </label>
          </div>
        </div>
        <div className="relative w-full h-48 col-start-2 border-2 border-white grid grid-flow-row auto-rows-[auto auto]">
          {featuredFiles?.length !== 0 && (
            <div className="absolute w-full h-full grid grid-cols-2 auto-rows-auto">
              {featuredFiles?.map((image: string, index: number) => {
                return (
                  <Image
                    key={index}
                    src={image}
                    width={22}
                    height={22}
                    objectFit="cover"
                    className="relative w-5 h-5"
                  />
                );
              })}
            </div>
          )}
          {updatedProductData?.featuredImages?.length !== 0 &&
            featuredFiles?.length === 0 && (
              <div
                className={`absolute w-full h-full grid grid-cols-2 auto-rows-auto overflow-hidden ${
                  updatedProductData?.featuredImages?.length > 2 &&
                  "place-content-center"
                } `}
              >
                {updatedProductData?.featuredImages?.map(
                  (image: any, index: number) => {
                    return (
                      <img
                        key={index}
                        src={`https://${image}.ipfs.w3s.link`}
                        className="w-full h-full relative object-cover"
                      />
                    );
                  }
                )}
              </div>
            )}
          <div className="relative w-fit h-fit self-end justify-self-center row-start-1 text-white text-economica">
            add secondary images
          </div>
          <div className="relative w-fit h-fit p-2 place-self-end row-start-2 grid grid-flow-col auto-cols-[auto auto]">
            <label
              className="relative w-fit h-fit p-2 place-self-end rounded-sm bg-grayBlue cursor-pointer active:scale-95 p-2"
              onChange={(e: FormEvent) => {
                showFileMainImage(e, "FeaturedImages");
                hashImageStringMultipleUpdated(e);
              }}
            >
              <TbPlus size={25} color="black" />
              <input
                type="file"
                hidden
                id="files"
                accept="image/png"
                multiple={true}
                name="featuredImages"
                disabled={
                  success || imageUploadingUpdated || updatedMutation.isLoading
                    ? true
                    : false
                }
              />
            </label>
          </div>
        </div>
      </div>
      {updatedMutation.isLoading || imageUploadingUpdated ? (
        <div className="relative w-full h-10 row-start-6 bg-grayBlue px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative w-fit h-fit place-self-center text-black font-economicaB animate-spin">
            <AiOutlineLoading size={20} color={"black"} />
          </div>
        </div>
      ) : updatedMutation.isError ? (
        <button
          className="relative w-full h-10 row-start-6 bg-grayPink px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto] hover:scale-95 active:scale-95 hover:opacity-80 cursor-pointer"
          type="submit"
        >
          <div className="relative w-fit h-fit place-self-center text-black font-economicaB">
            ERROR, TRY AGAIN
          </div>
        </button>
      ) : success ? (
        <div className="relative w-full h-10 row-start-6 bg-grayGreen px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto]">
          <div className="relative w-fit h-fit place-self-center text-black font-economicaB">
            SUCCESS
          </div>
        </div>
      ) : (
        <button
          className="relative w-full h-10 row-start-6 bg-grayBlue px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto] hover:scale-95 active:scale-95 hover:opacity-80 cursor-pointer"
          type="submit"
        >
          <div className="relative w-fit h-fit place-self-center text-black font-economicaB">
            UPDATE PRODUCT
          </div>
        </button>
      )}
    </form>
  );
};

export default UpdateForm;
