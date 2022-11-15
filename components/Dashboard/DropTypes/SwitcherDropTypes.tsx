import { FunctionComponent, useContext } from "react";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import Main from "./Main";
import AddDrop from "./AddDrop";
import UpdateDrop from "./UpdateDrop";
import useAddDropTypes from "./hooks/useAddDropTypes";
import useUpdateDropTypes from "./hooks/useUpdateDropTypes";
import { GlobalContext } from "../../../pages/_app";
import useAddProduct from "../Inventory/hooks/useAddProduct";

const SwitcherDropTypes: FunctionComponent = (): JSX.Element => {
  let action = "DROP_TYPES";

  const {
    isLoading,
    isError,
    data,
    handleDropSubmit,
    addMutation,
    success,
    setSuccess,
  } = useAddDropTypes();

  const {
    handleDropSubmitUpdate,
    updatedMutation,
    success: successUpdate,
    setSuccess: setSuccessUpdate,
    data: updateData,
  } = useUpdateDropTypes();

  const { setDeleteModal, setCantDeleteDrop } = useContext(GlobalContext);

  const displaySection = useSelector(
    (state: RootState) => state.app.dropReducer.value
  );

  const decideStringAction = () => {
    action = displaySection;
    return action;
  };

  const { data: productData } = useAddProduct();

  switch (decideStringAction()) {
    case "DROP_TYPES_ADD":
      return (
        <AddDrop
          handleDropSubmit={handleDropSubmit}
          addMutation={addMutation}
          success={success}
          setSuccess={setSuccess}
        />
      );

    case "DROP_TYPES_UPDATE":
      return (
        <UpdateDrop
          handleDropSubmitUpdate={handleDropSubmitUpdate}
          updatedMutation={updatedMutation}
          success={successUpdate}
          setSuccess={setSuccessUpdate}
          data={updateData}
        />
      );

    default:
      return (
        <Main
          setDeleteModal={setDeleteModal}
          isLoading={isLoading}
          isError={isError}
          data={data}
          productData={productData}
          setCantDeleteDrop={setCantDeleteDrop}
        />
      );
  }
};

export default SwitcherDropTypes;
