import { FormEvent, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDraft,
  getDraft,
  getDrafts,
  updateDraft,
} from "../../../../lib/helpers";
import { RootState } from "../../../../redux/store";
import { DraftInterface } from "../../../../types/general.types";
import moment from "moment";
import { setUpdateDraftImages } from "../../../../redux/reducers/updateDraftImagesSlice";
import { GlobalContext } from "../../../../pages/_app";
import { setDraft } from "../../../../redux/reducers/draftSlice";
import lodash from "lodash";
import { setDraftImages } from "../../../../redux/reducers/draftImageSlice";

const useUpdateDraft = () => {
  const draftId = useSelector((state: RootState) => state.app.draftReducer.id);
  const { setDeleteModal, clickedFirstDraft, setClickedFirstDraft } =
    useContext(GlobalContext);

  const { data: oneDraft } = useQuery(["drafts", draftId], () =>
    getDraft(draftId as string)
  );

  const dispatch = useDispatch();
  const finalImagesUpdated = useSelector(
    (state: RootState) => state.app.updateDraftImagesReducer.value
  );
  const draftImagesPresent = useSelector(
    (state: RootState) => state.app.draftReducer.productImages
  );
  const [imageDraftUpdateUploading, setImageDraftUpdateUploading] =
    useState<boolean>();
  const [mappedUpdatedImages, setMappedUpdatedImages] = useState<string[]>(
    draftImagesPresent?.length !== 0
      ? draftImagesPresent
      : oneDraft?.productImages.length !== 0
      ? oneDraft?.productImages
      : []
  );
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const updatedMutation = useMutation(
    (updatedData: DraftInterface) =>
      updateDraft(draftId as string, updatedData),
    {
      onSuccess: async () => {
        setUpdateSuccess(true);
        queryClient.prefetchQuery("drafts", getDrafts);
      },
    }
  );

  console.log(
    "final",
    finalImagesUpdated,
    "clicked",
    clickedFirstDraft,
    "present",
    draftImagesPresent
  );

  const handleDraftUpdate = (e: FormEvent) => {
    e.preventDefault();
    const draftTypeData: DraftInterface = {
      title: (e.target as HTMLFormElement).productTitle.value,
      description: (e.target as HTMLFormElement).description.value,
      productImages: !clickedFirstDraft
        ? finalImagesUpdated
        : clickedFirstDraft && finalImagesUpdated.length !== 0
        ? finalImagesUpdated
        : draftImagesPresent,
      date: moment().format("MM/D hh:mm:ss"),
    };
    try {
      updatedMutation.mutate(draftTypeData);
    } catch (err: any) {
      console.error(err.message);
    }
    dispatch(setDraftImages([]));
    (e.target as HTMLFormElement).reset();
    setClickedFirstDraft(true);
  };

  const hashImageStringDraftUpdate = async (e: FormEvent): Promise<any> => {
    let imageData = new FormData();
    let finalImages: any[] = [];
    setImageDraftUpdateUploading(true);
    imageData.append("image", (e.target as HTMLFormElement).files[0]);
    try {
      const response = await fetch("/api/ipfs", {
        method: "POST",
        body: imageData,
      });
      if (response.status !== 200) {
        console.log("ERROR", response);
        setImageDraftUpdateUploading(false);
        dispatch(setUpdateDraftImages(mappedUpdatedImages));
      } else {
        let responseJSON = await response.json();
        finalImages.push(responseJSON.cid);
        setImageDraftUpdateUploading(false);
        dispatch(
          setUpdateDraftImages([finalImages[0], ...mappedUpdatedImages])
        );
        setMappedUpdatedImages([finalImages[0], ...mappedUpdatedImages]);
        return finalImages;
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleDraftsDelete = async (): Promise<void> => {
    try {
      await deleteDraft(draftId as string);
      await queryClient.prefetchQuery("drafts", getDrafts);
      dispatch(
        setDraft({
          actionId: undefined,
          actionTitle: undefined,
          actionDescription: undefined,
          actionProductImages: undefined,
          actionType: "ADD_DRAFT",
        })
      );
      setDeleteModal(false);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleUpdateRemoveImages = (imageRemove: string): void => {
    setClickedFirstDraft(false);
    const newArray = lodash.filter(
      oneDraft?.productImages,
      (image) => image !== imageRemove
    );
    dispatch(setUpdateDraftImages(newArray));
  };

  const handleRemoveSecondUpdateImage = (imageRemove: string): void => {
    const newArray = lodash.filter(
      finalImagesUpdated,
      (image) => image !== imageRemove
    );
    dispatch(setUpdateDraftImages(newArray));
  };

  return {
    handleDraftUpdate,
    oneDraft,
    imageDraftUpdateUploading,
    updateSuccess,
    setUpdateSuccess,
    hashImageStringDraftUpdate,
    setMappedUpdatedImages,
    handleDraftsDelete,
    handleUpdateRemoveImages,
    handleRemoveSecondUpdateImage,
  };
};

export default useUpdateDraft;
