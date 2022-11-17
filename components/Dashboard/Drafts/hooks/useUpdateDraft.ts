import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getDraft, getDrafts, updateDraft } from "../../../../lib/helpers";
import { RootState } from "../../../../redux/store";
import { DraftInterface } from "../../../../types/general.types";
import moment from "moment";
import { setUpdateDraftImages } from "../../../../redux/reducers/updateDraftImagesSlice";

const useUpdateDraft = () => {
  const draftId = useSelector((state: RootState) => state.app.draftReducer.id);

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
    draftImagesPresent?.length !== 0 ? draftImagesPresent : []
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

  const handleDraftUpdate = (e: FormEvent) => {
    e.preventDefault();
    const draftTypeData: DraftInterface = {
      title: (e.target as HTMLFormElement).productTitle.value,
      description: (e.target as HTMLFormElement).description.value,
      productImages:
        finalImagesUpdated?.length !== 0
          ? finalImagesUpdated
          : draftImagesPresent,
      date: moment().format("MM/D hh:mm:ss"),
    };
    try {
      updatedMutation.mutate(draftTypeData);
    } catch (err: any) {
      console.error(err.message);
    }
    (e.target as HTMLFormElement).reset();
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

  return {
    handleDraftUpdate,
    oneDraft,
    imageDraftUpdateUploading,
    updateSuccess,
    setUpdateSuccess,
    hashImageStringDraftUpdate,
    setMappedUpdatedImages,
  };
};

export default useUpdateDraft;
