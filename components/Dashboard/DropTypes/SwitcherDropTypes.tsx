import { FunctionComponent } from "react";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import Main from "./Main";
import AddDrop from "./AddDrop";
import UpdateDrop from "./UpdateDrop";
import useAddDropTypes from "./hooks/useAddDropTypes";
import useUpdateDropTypes from "./hooks/useUpdateDropTypes";

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
    handleDropSubmit: handleDropSubmitUpdate,
    addMutation: addMutationUpdate,
    success: successUpdate,
    setSuccess: setSuccessUpdate,
    data: updateData,
  } = useUpdateDropTypes();

  const displaySection = useSelector(
    (state: RootState) => state.app.displayReducer.value
  );

  const decideStringAction = () => {
    action = displaySection;
    return action;
  };

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
          handleDropSubmit={handleDropSubmitUpdate}
          addMutation={addMutationUpdate}
          success={successUpdate}
          setSuccess={setSuccessUpdate}
          data={updateData}
        />
      );

    default:
      return <Main isLoading={isLoading} isError={isError} data={data} />;
  }
};

export default SwitcherDropTypes;
