import { FunctionComponent } from "react";
import { RootState } from "./../../../redux/store";
import { useSelector } from "react-redux";
import { SwitcherDraftProps } from "../../../types/general.types";
import Form from "./Form";
import UpdateForm from "./UpdateForm";

const Switcher: FunctionComponent<SwitcherDraftProps> = ({
  hashImageStringDraft,
  imagesArray,
  handleDraftUpdate,
  handleDraftSubmit,
  success,
  draft,
  imageDraftUploading,
  setSuccess,
  imageDraftUpdateUploading,
  updateSuccess,
  setUpdateSuccess,
  hashImageStringDraftUpdate,
  imageDraftUpdated,
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
          handleDraftUpdate={handleDraftUpdate}
          draft={draft}
          imageDraftUpdateUploading={imageDraftUpdateUploading}
          updateSuccess={updateSuccess}
          setUpdateSuccess={setUpdateSuccess}
          hashImageStringDraftUpdate={hashImageStringDraftUpdate}
          imageDraftUpdated={imageDraftUpdated}
        />
      );

    default:
      return (
        <Form
          imageDraftUploading={imageDraftUploading}
          handleDraftSubmit={handleDraftSubmit}
          success={success}
          hashImageStringDraft={hashImageStringDraft}
          imagesArray={imagesArray}
          setSuccess={setSuccess}
        />
      );
  }
};

export default Switcher;
