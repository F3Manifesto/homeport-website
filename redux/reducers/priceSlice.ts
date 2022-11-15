import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PriceState {
  price?: number;
  token?: string;
}

const initialPriceState: PriceState = {
  price: undefined,
  token: undefined,
};

export const priceSlice = createSlice({
  name: "price",
  initialState: initialPriceState,
  reducers: {
    setPrice: (
      state: PriceState,
      { payload: { actionPrice, actionToken } }
    ) => {
      state.price = actionPrice;
      state.token = actionToken;
    },
  },
});

export const { setPrice } = priceSlice.actions;

export default priceSlice.reducer;
