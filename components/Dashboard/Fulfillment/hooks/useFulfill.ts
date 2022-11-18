import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses, getProducts, updateAddress } from "../../../../lib/helpers";
import { setFulfill } from "../../../../redux/reducers/selectedFulfillSlice";
import { RootState } from "../../../../redux/store";
import { AddressInterface } from "../../../../types/general.types";

const useFulfill = () => {
  const providers: string[] = [
    "printful",
    "jet print",
    "tee launch",
    "printify",
  ];
  const dispatch = useDispatch();
  const [providerValue, setProviderValue] = useState<string | undefined>();
  const [addressUpdateSuccess, setAddressUpdateSuccess] = useState<boolean>();
  const addressInfo = useSelector(
    (state: RootState) => state.app.fulfillReducer
  );
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: productData,
  } = useQuery("products", getProducts);

  const updatedMutation = useMutation(
    (updatedData: AddressInterface) =>
      updateAddress(addressInfo.id as string, updatedData),
    {
      onSuccess: async () => {
        setAddressUpdateSuccess(true);
        queryClient.prefetchQuery("addresses", getAddresses);
      },
    }
  );

  const handleFulfillOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!providerValue) {
      alert("Please choose a provider");
      return;
    }
    const addressData: AddressInterface = {
      firstName: addressInfo.firstName,
      lastName: addressInfo.lastName,
      email: addressInfo.email,
      countryLocation: addressInfo.countryLocation,
      street: addressInfo.street,
      buildingAparmentNo: addressInfo.buildingAparmentNo,
      stateProvince: addressInfo.stateProvince,
      city: addressInfo.city,
      zipCode: addressInfo.zipCode,
      forProductName: addressInfo.forProductName,
      forProductPrice: addressInfo.forProductPrice,
      forProductToken: addressInfo.forProductToken,
      forProductQuantity: addressInfo.forProductQuantity,
      forProductMainImage: addressInfo.forProductMainImage,
      forProductDropType: addressInfo.forProductDropType,
      fulfilled: true,
      provider: providerValue,
    };
    try {
      updatedMutation.mutate(addressData);
    } catch (err: any) {
      console.error(err.message);
    }
    setProviderValue(undefined);
    dispatch(setFulfill({}));
  };

  return {
    handleFulfillOrder,
    providers,
    setProviderValue,
    providerValue,
    addressUpdateSuccess,
    setAddressUpdateSuccess,
    productData
  };
};

export default useFulfill;
