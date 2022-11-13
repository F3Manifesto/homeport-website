import { useQuery } from "react-query";
import { getDropTypes } from "../../../../lib/helpers";
import { useMutation } from "react-query";
import { addDropType } from "../../../../lib/helpers";
import { FormEvent, useState } from "react";
import { DropInterface, UseAddDropTypesResult } from "../../../../types/general.types";

const useAddDropTypes = (): UseAddDropTypesResult => {
  const { isLoading, isError, data } = useQuery("dropTypes", getDropTypes);
  const [success, setSuccess] = useState<boolean>(false);

  const addMutation = useMutation(addDropType, {
    onSuccess: () => {
      setSuccess(true)
    },
  });

  const handleDropSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const dropTypeData: DropInterface = {
      title: (e.target as HTMLFormElement).dropTypeTitle.value,
      description: (e.target as HTMLFormElement).dropTypeDescription.value,
    };
    addMutation.mutate(dropTypeData);
  };

  return {
    data,
    isLoading,
    isError,
    handleDropSubmit,
    addMutation,
    success,
    setSuccess
  };
};

export default useAddDropTypes;
