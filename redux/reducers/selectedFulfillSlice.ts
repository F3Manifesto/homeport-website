import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedFulfillState {
  id?: string;
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
  forProductFulfilled?: boolean;
  forProductProvider?: string;
}

const initialFulfillState: SelectedFulfillState = {
  id: undefined,
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
  forProductFulfilled: undefined,
  forProductProvider: undefined,
};

export const selectedFulfillSlice = createSlice({
  name: "fulfill",
  initialState: initialFulfillState,
  reducers: {
    setFulfill: (
      state: SelectedFulfillState,
      {
        payload: {
          actionId,
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
          actionProductFulfilled,
          actionProvider,
        },
      }
    ) => {
      state.id = actionId;
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
      state.forProductFulfilled = actionProductFulfilled;
      state.forProductProvider = actionProvider;
    },
  },
});

export const { setFulfill } = selectedFulfillSlice.actions;

export default selectedFulfillSlice.reducer;
