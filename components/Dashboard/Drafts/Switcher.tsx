import { FunctionComponent, useContext } from "react";
import { RootState } from "./../../../redux/store";
import { useSelector } from "react-redux";
import { SwitcherDraftProps } from "../../../types/general.types";
import Form from "./Form";
import UpdateForm from "./UpdateForm";
import { GlobalContext } from "../../../pages/_app";

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

  const {setDeleteModal} = useContext(GlobalContext);

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
          setDeleteModal={setDeleteModal}
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
