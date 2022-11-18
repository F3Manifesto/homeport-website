import { createSlice } from "@reduxjs/toolkit";

export interface ItemState {
  name?: string;
  description?: string;
  mainImage?: string;
  quantity?: number;
  price?: number;
  token?: string;
  dropType?: string;
}

const initialItemState: ItemState = {
  name: undefined,
  description: undefined,
  mainImage: undefined,
  quantity: undefined,
  price: undefined,
  token: undefined,
  dropType: undefined,
};
export const itemSlice = createSlice({
  name: "item",
  initialState: initialItemState,
  reducers: {
    setItem: (
      state: ItemState,
      {
        payload: {
          actionName,
          actionDescription,
          actionMainImage,
          actionQuantity,
          actionPrice,
          actionToken,
          actionDropType,
        },
      }
    ) => {
      state.name = actionName;
      state.description = actionDescription;
      state.mainImage = actionMainImage;
      state.quantity = actionQuantity;
      state.price = actionPrice;
      state.token = actionToken;
      state.dropType = actionDropType;
    },
  },
});

export const { setItem } = itemSlice.actions;

export default itemSlice.reducer;
