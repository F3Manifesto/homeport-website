import { FunctionComponent, useContext, useEffect } from "react";
import Map from "./Map";
import Switcher from "./Switcher";
import useAddProduct from "./hooks/useAddProduct";
import { GlobalContext } from "../../../pages/_app";
import useAddDropTypes from "../DropTypes/hooks/useAddDropTypes";
import useUpdateProduct from "./hooks/useUpdateProduct";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MainInventoryProps } from "../../../types/general.types";
import useCheckCurrency from "./hooks/useCheckCurrency";
import { setProduct } from "../../../redux/reducers/productSlice";

const Main: FunctionComponent<MainInventoryProps> = ({
  handleLandTop,
  handleModalTop,
}): JSX.Element => {
  const {
    isLoading,
    isError,
    data: productData,
    handleProductSubmit,
    addMutation,
    productSuccess,
    setProductSuccess,
    dropFormat,
    openDropDown,
    setOpenDropDown,
    showFileMainImage,
    handleDropFormatArray,
    hashImageStringOne,
    imageUploading,
    hashImageStringMultiple,
  } = useAddProduct();
  const {
    featuredFiles,
    setFeaturedFiles,
    mainFile,
    setMainFile,
    setDeleteModal,
    setAddPricingModal,
    clickedFirst,
    setClickedFirst,
  } = useContext(GlobalContext);
  const { currencyData } = useCheckCurrency();
  const dispatch = useDispatch();
  const {
    handleProductSubmitUpdate,
    success,
    setSuccess,
    handleDispatchFormatArray,
    data: updatedProductData,
    updatedMutation,
    handleExistingDropFormatArray,
    newDropFormatArray,
    hashImageStringMultipleUpdated,
    imageUploadingUpdated,
    hashImageStringOneUpdated,
  } = useUpdateProduct();
  const { data } = useAddDropTypes();
  const addOrUpdate = useSelector(
    (state: RootState) => state.app.productReducer.value
  );
  useEffect(() => {
    if (productSuccess) {
      setTimeout(() => {
        setProductSuccess(false);
      }, 4000);
    }
  }, [productSuccess]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="relative col-start-2 w-full h-fit grid grid-flow-cols auto-cols-[auto auto] py-8 gap-40">
      <div className="relative w-full h-fit col-start-1 grid grid-flow-row auto-rows-[auto auto]">
        <div className="relative w-full h-fit text-white font-economicaB row-start-1 text-3xl">
          {addOrUpdate === "INVENTORY_UPDATE" ? (
            <div className="relative w-full h-fit grid grid-flow-col auto-cols-[auto auto] gap-3">
              <div className="relative w-fit h-fit col-start-1 pr-6">
                UPDATE PRODUCT
              </div>
              <div className="relative w-1 h-5 bg-white col-start-2 self-center justify-self-end"></div>
              <div
                className="relative w-fit h-fit col-start-3 text-base justify-self-start self-center cursor-pointer active:scale-95 hover:opacity-70"
                onClick={() => {
                  setFeaturedFiles([]);
                  setMainFile(undefined);
                  dispatch(
                    setProduct({
                      actionValue: "INVENTORY_ADD",
                      actionId: undefined,
                    })
                  );
                  setClickedFirst(true);
                }}
              >
                ADD PRODUCT
              </div>
            </div>
          ) : (
            "ADD PRODUCT"
          )}
        </div>
        <Switcher
          hashImageStringOneUpdated={hashImageStringOneUpdated}
          hashImageStringMultipleUpdated={hashImageStringMultipleUpdated}
          imageUploadingUpdated={imageUploadingUpdated}
          dropFormat={dropFormat}
          productSuccess={productSuccess}
          setProductSuccess={setProductSuccess}
          setOpenDropDown={setOpenDropDown}
          openDropDown={openDropDown}
          showFileMainImage={showFileMainImage}
          mainFile={mainFile}
          featuredFiles={featuredFiles}
          handleProductSubmit={handleProductSubmit}
          handleDropFormatArray={handleDropFormatArray}
          data={data}
          handleDispatchFormatArray={handleDispatchFormatArray}
          addMutation={addMutation}
          newDropFormatArray={newDropFormatArray}
          updatedProductData={updatedProductData}
          updatedMutation={updatedMutation}
          success={success}
          setSuccess={setSuccess}
          handleProductSubmitUpdate={handleProductSubmitUpdate}
          handleExistingDropFormatArray={handleExistingDropFormatArray}
          hashImageStringOne={hashImageStringOne}
          imageUploading={imageUploading}
          hashImageStringMultiple={hashImageStringMultiple}
          clickedFirst={clickedFirst}
        />
      </div>
      <div className="relative w-full h-fit col-start-2 grid grid-flow-row auto-rows-[auto auto] justify-self-end">
        <div className="relative w-fit h-fit text-white font-economicaB row-start-1 text-3xl justify-self-end">
          ALL PRODUCTS
        </div>
        <Map
          productData={productData}
          setDeleteModal={setDeleteModal}
          handleModalTop={handleModalTop}
          currencyData={currencyData}
          setAddPricingModal={setAddPricingModal}
          handleLandTop={handleLandTop}
          setClickedFirst={setClickedFirst}
        />
      </div>
    </div>
  );
};

export default Main;
