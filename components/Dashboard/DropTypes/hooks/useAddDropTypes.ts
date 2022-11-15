import { useQuery, useQueryClient } from "react-query";
import { getDropTypes } from "../../../../lib/helpers";
import { useMutation } from "react-query";
import { addDropType } from "../../../../lib/helpers";
import { FormEvent, useState } from "react";
import {
  DropInterface,
  UseAddDropTypesResult,
} from "../../../../types/general.types";

const useAddDropTypes = (): UseAddDropTypesResult => {
  const { isLoading, isError, data } = useQuery("dropTypes", getDropTypes);
  const [success, setSuccess] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const addMutation = useMutation(addDropType, {
    onSuccess: async () => {
      setSuccess(true);
      queryClient.prefetchQuery("dropTypes", getDropTypes);
    },
  });

  const handleDropSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const dropTypeData: DropInterface = {
      title: (e.target as HTMLFormElement).dropTypeTitle.value,
      description: (e.target as HTMLFormElement).dropTypeDescription.value,
    };
    addMutation.mutate(dropTypeData);
    (e.target as HTMLFormElement).reset();
  };

  return {
    data,
    isLoading,
    isError,
    handleDropSubmit,
    addMutation,
    success,
    setSuccess,
  };
};

export default useAddDropTypes;
