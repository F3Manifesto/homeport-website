import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addDraft, getDrafts } from "../../../../lib/helpers";
import { DraftInterface } from "../../../../types/general.types";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setDraftImages } from "../../../../redux/reducers/draftImageSlice";

const useAddDraft = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { data: drafts } = useQuery("drafts", getDrafts);
  const draftImagesCache = useSelector(
    (state: RootState) => state.app.draftImageReducer.value
  );
  const dispatch = useDispatch();

  const addMutation = useMutation(addDraft, {
    onSuccess: async () => {
      setSuccess(true);
      queryClient.prefetchQuery("drafts", getDrafts);
    },
  });

  const handleDraftSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const draftTypeData: DraftInterface = {
      title: (e.target as HTMLFormElement).productTitle.value,
      description: (e.target as HTMLFormElement).description.value,
      productImages: draftImagesCache?.length !== 0 ? draftImagesCache : [],
      date: moment().format("MM/D hh:mm:ss"),
    };
    addMutation.mutate(draftTypeData);
    (e.target as HTMLFormElement).reset();
  };

  const showImages = (e: FormEvent): void => {
    if (draftImagesCache?.length !== 0) {
      let imagesArray: string[] = draftImagesCache;
      imagesArray.concat((e.target as HTMLFormElement).files[0]);
      dispatch(setDraftImages(imagesArray));
    } else {
      dispatch(setDraftImages((e.target as HTMLFormElement).files[0]));
    }
  };

  return { handleDraftSubmit, success, showImages, drafts };
};

export default useAddDraft;
