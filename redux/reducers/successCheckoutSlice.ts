import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SuccessCheckoutState {
  value: boolean;
  image: string;
}

const initialSuccessCheckoutState: SuccessCheckoutState = {
  value: false,
  image: "",
};

export const successCheckoutSlice = createSlice({
  name: "successCheckout",
  initialState: initialSuccessCheckoutState,
  reducers: {
    setSuccessCheckout: (
      state: SuccessCheckoutState,
      { payload: { actionValue, actionImage } }
    ) => {
      state.value = actionValue;
      state.image = actionImage;
    },
  },
});

export const { setSuccessCheckout } = successCheckoutSlice.actions;

export default successCheckoutSlice.reducer;
