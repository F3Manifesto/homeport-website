import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { getDraft, getDrafts, updateDraft } from "../../../../lib/helpers";
import { RootState } from "../../../../redux/store";
import { DraftInterface } from "../../../../types/general.types";
import moment from "moment";

const useUpdateDraft = () => {
  const draftId = useSelector((state: RootState) => state.app.draftReducer.id);
  console.log("INSIDE", draftId);

  const { data: oneDraft } = useQuery(["drafts", draftId], () =>
    getDraft(draftId as string)
  );

  console.log(oneDraft)


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
      // productImages: draftImagesCache?.length !== 0 ? draftImagesCache : [],
      date: moment().format("MM/D hh:mm:ss"),
    };
    try {
      updatedMutation.mutate(draftTypeData);
    } catch (err: any) {
      console.error(err.message);
    }
    (e.target as HTMLFormElement).reset();
  };

  return { handleDraftUpdate, oneDraft };
};

export default useUpdateDraft;
