import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FeaturedImagesState {
  value?: string[];
}

const initialFeaturedImagesState: FeaturedImagesState = {
  value: [],
};

export const featuredImagesSlice = createSlice({
  name: "featuredImages",
  initialState: initialFeaturedImagesState,
  reducers: {
    setFeatured: (
      state: FeaturedImagesState,
      action: PayloadAction<string[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setFeatured } = featuredImagesSlice.actions;

export default featuredImagesSlice.reducer;
