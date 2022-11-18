import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedState {
  name?: string;
  slug?: string;
  description?: string;
  dropType?: string;
  mainImage?: string;
}

const initialSelectedState: SelectedState = {
  name: undefined,
  slug: undefined,
  description: undefined,
  dropType: undefined,
  mainImage: undefined,
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState: initialSelectedState,
  reducers: {
    setSelected: (
      state: SelectedState,
      {
        payload: {
          actionName,
          actionSlug,
          actionDescription,
          actionDropType,
          actionMainImage,
        },
      }
    ) => {
      state.name = actionName;
      state.slug = actionSlug;
      state.description = actionDescription;
      state.dropType = actionDropType;
      state.mainImage = actionMainImage;
    },
  },
});

export const { setSelected } = selectedSlice.actions;

export default selectedSlice.reducer;
