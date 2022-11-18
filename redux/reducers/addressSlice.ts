import { createSlice } from "@reduxjs/toolkit";

export interface AddressState {
  firstName?: string;
  lastName?: string;
  email?: string;
  countryLocation?: string;
  street?: string;
  buildingAparmentNo?: string;
  stateProvince?: string;
  city?: string;
  zipCode?: string;
  forProductName?: string;
  forProductPrice?: number;
  forProductToken?: string;
  forProductQuantity?: number;
  forProductMainImage?: string;
  forProductDropType?: string;
}

const initialAddressState: AddressState = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  countryLocation: undefined,
  street: undefined,
  buildingAparmentNo: undefined,
  stateProvince: undefined,
  city: undefined,
  zipCode: undefined,
  forProductName: undefined,
  forProductPrice: undefined,
  forProductToken: undefined,
  forProductQuantity: undefined,
  forProductMainImage: undefined,
  forProductDropType: undefined,
};
export const addressSlice = createSlice({
  name: "address",
  initialState: initialAddressState,
  reducers: {
    setAddress: (
      state: AddressState,
      {
        payload: {
          actionFirstName,
          actionLastName,
          actionEmail,
          actionCountryLocation,
          actionStreet,
          actionBuilding,
          actionState,
          actionCity,
          actionZip,
          actionProductName,
          actionProductPrice,
          actionProductToken,
          actionProductQuantity,
          actionProductMainImage,
          actionProductDropType,
        },
      }
    ) => {
      state.firstName = actionFirstName;
      state.lastName = actionLastName;
      state.email = actionEmail;
      state.countryLocation = actionCountryLocation;
      state.street = actionStreet;
      state.buildingAparmentNo = actionBuilding;
      state.stateProvince = actionState;
      state.city = actionCity;
      state.zipCode = actionZip;
      state.forProductName = actionProductName;
      state.forProductPrice = actionProductPrice;
      state.forProductToken = actionProductToken;
      state.forProductQuantity = actionProductQuantity;
      state.forProductMainImage = actionProductMainImage;
      state.forProductDropType = actionProductDropType;
    },
  },
});

export const { setAddress } = addressSlice.actions;

export default addressSlice.reducer;
