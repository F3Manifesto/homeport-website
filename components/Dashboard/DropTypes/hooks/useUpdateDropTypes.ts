import { useQuery } from "react-query";
import { useMutation } from "react-query";
import {
  deleteDropType,
  getDropType,
  getDropTypes,
  updateDropType,
} from "../../../../lib/helpers";
import { FormEvent, useContext, useState } from "react";
import {
  DropInterface,
  UseUpdateDropTypesResult,
} from "../../../../types/general.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { GlobalContext } from "../../../../pages/_app";
import { useQueryClient } from "react-query";

const useUpdateDropTypes = (): UseUpdateDropTypesResult => {
  const dropTypeId = useSelector(
    (state: RootState) => state.app.dropReducer.id
  );
  const { setDeleteModal } = useContext(GlobalContext);
  const { isLoading, isError, data } = useQuery(["dropTypes", dropTypeId], () =>
    getDropType(dropTypeId as string)
  );
  const [success, setSuccess] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const updatedMutation = useMutation(
    (updatedData: DropInterface) =>
      updateDropType(dropTypeId as string, updatedData),
    {
      onSuccess: async () => {
        setSuccess(true);
        queryClient.prefetchQuery("dropTypes", getDropTypes);
      },
    }
  );

  const handleDropSubmitUpdate = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const dropTypeData: DropInterface = {
      title: (e.target as HTMLFormElement).dropTypeTitle.value,
      description: (e.target as HTMLFormElement).dropTypeDescription.value,
    };
    try {
      await updatedMutation.mutate(dropTypeData);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleDropDelete = async (): Promise<void> => {
    try {
      await deleteDropType(dropTypeId as string);
      await queryClient.prefetchQuery("dropTypes", getDropTypes);
      setDeleteModal(false);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return {
    data,
    isLoading,
    isError,
    handleDropSubmitUpdate,
    updatedMutation,
    success,
    setSuccess,
    handleDropDelete,
  };
};

export default useUpdateDropTypes;
