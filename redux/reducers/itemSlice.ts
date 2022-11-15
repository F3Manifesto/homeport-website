import { createSlice } from "@reduxjs/toolkit";

export interface ItemState {
  name?: string;
  description?: string;
  mainImage?: string;
}

const initialItemState: ItemState = {
  name: undefined,
  description: undefined,
  mainImage: undefined,
};

export const itemSlice = createSlice({
  name: "item",
  initialState: initialItemState,
  reducers: {
    setItem: (
      state: ItemState,
      { payload: { actionName, actionDescription, actionMainImage } }
    ) => {
      state.name = actionName;
      state.description = actionDescription;
      state.mainImage = actionMainImage;
    },
  },
});

export const { setItem } = itemSlice.actions;

export default itemSlice.reducer;
