import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
  value: string;
  slug?: string;
}

const initialProductState: ProductState = {
  value: "INVENTORY_ADD",
  slug: undefined,
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    setProduct: (
      state: ProductState,
      { payload: { actionValue, actionId } }
    ) => {
      state.value = actionValue;
      state.slug = actionId;
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
