import { FunctionComponent } from "react";
import { RootState } from "./../../../redux/store";
import { useSelector } from "react-redux";
import { SwitcherDraftProps } from "../../../types/general.types";
import Form from "./Form";
import UpdateForm from "./UpdateForm";

const Switcher: FunctionComponent<SwitcherDraftProps> = ({
  showImages,
  hashImageStringOne,
  imagesArray,
  handleDraftUpdate,
  handleDraftSubmit,
  success,
  draft,
}): JSX.Element => {
  let action = "ADD_DRAFT";
  const draftSection = useSelector(
    (state: RootState) => state.app.draftReducer.type
  );

  const decideStringAction = () => {
    action = draftSection;
    return action;
  };

  switch (decideStringAction()) {
    case "UPDATE_DRAFT":
      return (
        <UpdateForm
          showImages={showImages}
          hashImageStringOne={hashImageStringOne}
          imagesArray={imagesArray}
          handleDraftUpdate={handleDraftUpdate}
          draft={draft}
        />
      );

    default:
      return (
        <Form
          showImages={showImages}
          handleDraftSubmit={handleDraftSubmit}
          success={success}
          hashImageStringOne={hashImageStringOne}
          imagesArray={imagesArray}
        />
      );
  }
};

export default Switcher;
