import { FunctionComponent, useContext, useEffect } from "react";
import Map from "./Map";
import Switcher from "./Switcher";
import useAddProduct from "./hooks/useAddProduct";
import { GlobalContext } from "../../../pages/_app";
import useAddDropTypes from "../DropTypes/hooks/useAddDropTypes";
import useUpdateProduct from "./hooks/useUpdateProduct";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Main: FunctionComponent = (): JSX.Element => {
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
    mainFile,
    featuredFiles,
    handleDropFormatArray,
  } = useAddProduct();
  const { setDeleteModal } = useContext(GlobalContext);

  const {
    handleProductSubmitUpdate,
    success,
    setSuccess,
    handleDispatchFormatArray,
    data: updatedProductData,
    updatedMutation,
    handleExistingDropFormatArray,
    newDropFormatArray,
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
        <div className="relative w-fit h-fit text-white font-economicaB row-start-1 text-3xl">
          {addOrUpdate === "INVENTORY_UPDATE"
            ? "UPDATE PRODUCT"
            : "ADD PRODUCT"}
        </div>
        <Switcher
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
        />
      </div>
      <div className="relative w-full h-fit col-start-2 grid grid-flow-row auto-rows-[auto auto] justify-self-end">
        <div className="relative w-fit h-fit text-white font-economicaB row-start-1 text-3xl justify-self-end">
          ALL PRODUCTS
        </div>
        <Map productData={productData} setDeleteModal={setDeleteModal} />
      </div>
    </div>
  );
};

export default Main;
