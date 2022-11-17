import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addDraft, getDrafts } from "../../../../lib/helpers";
import { DraftInterface } from "../../../../types/general.types";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setDraftImages } from "../../../../redux/reducers/draftImageSlice";
import lodash from "lodash";

const useAddDraft = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { data: drafts } = useQuery("drafts", getDrafts);
  const draftImagesCache = useSelector(
    (state: RootState) => state.app.draftImageReducer.value
  );
  const dispatch = useDispatch();
  const [imageDraftUploading, setImageDraftUploading] = useState<boolean>();

  const addMutation = useMutation(addDraft, {
    onSuccess: async () => {
      setSuccess(true);
      queryClient.prefetchQuery("drafts", getDrafts);
    },
  });
  const [mappedImages, setMappedImages] = useState<string[]>([]);

  const handleDraftSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const draftTypeData: DraftInterface = {
      title: (e.target as HTMLFormElement).productTitle.value,
      description: (e.target as HTMLFormElement).description.value,
      productImages: draftImagesCache?.length !== 0 ? draftImagesCache : [],
      date: moment().format("MM/D hh:mm:ss"),
    };
    addMutation.mutate(draftTypeData);
    dispatch(setDraftImages([]));
    setMappedImages([]);
    (e.target as HTMLFormElement).reset();
  };

  const hashImageStringDraft = async (e: FormEvent): Promise<any> => {
    let imageData = new FormData();
    let finalImages: any[] = [];
    setImageDraftUploading(true);
    imageData.append("image", (e.target as HTMLFormElement).files[0]);
    try {
      const response = await fetch("/api/ipfs", {
        method: "POST",
        body: imageData,
      });
      if (response.status !== 200) {
        console.log("ERROR", response);
        setImageDraftUploading(false);
        dispatch(setDraftImages(mappedImages));
      } else {
        let responseJSON = await response.json();
        finalImages.push(responseJSON.cid);
        setImageDraftUploading(false);
        dispatch(setDraftImages([finalImages[0], ...mappedImages]));
        setMappedImages([finalImages[0], ...mappedImages]);
        return finalImages;
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const imagesArray = useSelector(
    (state: RootState) => state.app.draftImageReducer.value
  );

  const handleRemoveImage = (imageRemove: string): void => {
    const newArray = lodash.filter(
      imagesArray,
      (image) => image !== imageRemove
    );
    console.log(newArray);
    dispatch(setDraftImages(newArray));
  };

  return {
    handleDraftSubmit,
    success,
    drafts,
    hashImageStringDraft,
    imageDraftUploading,
    setSuccess,
    handleRemoveImage,
    setMappedImages,
  };
};

export default useAddDraft;
