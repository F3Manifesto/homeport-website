import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { addAddress } from "../../../../lib/helpers";
import {
  AddressInterface,
  useDetailsResults,
} from "../../../../types/general.types";

const useDetails = (): useDetailsResults => {
  const [detailsSuccess, setDetailsSuccess] = useState<boolean>(false);

  const addMutation = useMutation(addAddress, {
    onSuccess: async () => {
      setDetailsSuccess(true);
    },
  });

  const handleAddressSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const addressData: AddressInterface = {
      firstName: (e.target as HTMLFormElement).firstName.value,
      lastName: (e.target as HTMLFormElement).lastName.value,
      email: (e.target as HTMLFormElement).email.value,
      countryLocation: (e.target as HTMLFormElement).country.value,
      street: (e.target as HTMLFormElement).street.value,
      buildingAparmentNo: (e.target as HTMLFormElement).aptNo.value,
      stateProvince: (e.target as HTMLFormElement).state.value,
      city: (e.target as HTMLFormElement).city.value,
      zipCode: (e.target as HTMLFormElement).zip.value,
    };
    addMutation.mutate(addressData);
  };

  return { handleAddressSubmit, detailsSuccess };
};

export default useDetails;
