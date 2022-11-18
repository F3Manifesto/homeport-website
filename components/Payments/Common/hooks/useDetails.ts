import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import {
  addAddress,
  getAddresses,
  updateProduct,
} from "../../../../lib/helpers";
import { RootState } from "../../../../redux/store";
import {
  AddressInterface,
  ProductInterface,
  useDetailsResults,
} from "../../../../types/general.types";
import lodash from "lodash";

const useDetails = (): useDetailsResults => {
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [productSuccess, setProductSuccess] = useState<boolean>(false);
  const addressDataValues = useSelector(
    (state: RootState) => state.app.addressReducer
  );
  const [detailsSuccess, setDetailsSuccess] = useState<boolean>();
  const soldItem = useSelector(
    (state: RootState) => state.app.soldAmountReducer
  );
  const {
    isLoading,
    isError,
    data: addressData,
  } = useQuery("addresses", getAddresses);

  const filteredOrders = lodash.filter(
    addressData,
    (item) => item.forProductName === soldItem.name
  );

  const addMutation = useMutation(addAddress, {
    onSuccess: async () => {
      setPaymentSuccess(true);
    },
  });

  const updatedMutation = useMutation(
    (updatedData: ProductInterface) =>
      updateProduct(soldItem?.slug as string, updatedData),
    {
      onSuccess: async () => {
        setProductSuccess(true);
      },
    }
  );

  const handleUpdateAmountSold = (): void => {
    const productData: ProductInterface = {
      name: soldItem.name,
      description: soldItem.description,
      dropType: soldItem.dropType,
      dropFormat: soldItem.dropFormat,
      quantity: soldItem.quantity,
      mainImage: soldItem.mainImage,
      featuredImages: soldItem.featuredImages,
      slug: soldItem.slug,
      soldOut: soldItem.soldOut,
      amountSold: filteredOrders?.length,
    };
    try {
      updatedMutation.mutate(productData);
    } catch (err: any) {
      console.error(err.message);
    }
  };

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
    handleUpdateAmountSold,
  };
};

export default useDetails;
