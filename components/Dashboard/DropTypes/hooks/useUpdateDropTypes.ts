import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { getDropType } from "../../../../lib/helpers";
import { FormEvent, useState } from "react";
import { DropInterface } from "../../../../types/general.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const useUpdateDropTypes = () => {
  const dropTypeId = useSelector(
    (state: RootState) => state.app.displayReducer.id
  );
  const { isLoading, isError, data } = useQuery(
    ["dropTypes", dropTypeId],
    () => getDropType
  );
  const [success, setSuccess] = useState<boolean>(false);

  const addMutation = useMutation(getDropType, {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const handleDropSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const dropTypeData: DropInterface = {
      title: (e.target as HTMLFormElement).dropTypeTitle.value,
      description: (e.target as HTMLFormElement).dropTypeDescription.value,
    };
    // addMutation.mutate(dropTypeData);
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

export default useUpdateDropTypes;
