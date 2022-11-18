import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { addAddress } from "../../../../lib/helpers";
import { RootState } from "../../../../redux/store";
import {
  AddressInterface,
  useDetailsResults,
} from "../../../../types/general.types";

const useDetails = (): useDetailsResults => {
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const addressDataValues = useSelector(
    (state: RootState) => state.app.addressReducer
  );
  const [detailsSuccess, setDetailsSuccess] = useState<boolean>();

  const addMutation = useMutation(addAddress, {
    onSuccess: async () => {
      setPaymentSuccess(true);
    },
  });

  const handleAddressSubmit = (): void => {
    const addressData: AddressInterface = {
      firstName: addressDataValues.firstName,
      lastName: addressDataValues.lastName,
      email: addressDataValues.email,
      countryLocation: addressDataValues.countryLocation,
      street: addressDataValues.street,
      buildingAparmentNo: addressDataValues.buildingAparmentNo,
      stateProvince: addressDataValues.stateProvince,
      city: addressDataValues.city,
      zipCode: addressDataValues.zipCode,
      forProductName: addressDataValues.forProductName,
      forProductPrice: addressDataValues.forProductPrice,
      forProductToken: addressDataValues.forProductToken,
      forProductQuantity: addressDataValues.forProductQuantity,
      forProductMainImage: addressDataValues.forProductMainImage,
      forProductDropType: addressDataValues.forProductDropType,
    };
    addMutation.mutate(addressData);
  };

  return {
    handleAddressSubmit,
    paymentSuccess,
    setDetailsSuccess,
    detailsSuccess,
  };
};

export default useDetails;
