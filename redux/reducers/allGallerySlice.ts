import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gallery } from "../../types/general.types";

export interface AllGalleryState {
  gallery: Gallery[];
}

const initialAllGalleryState: AllGalleryState = {
  gallery: [],
};

export const allGallerySlice = createSlice({
  name: "allGallery",
  initialState: initialAllGalleryState,
  reducers: {
    setAllGallery: (
      state: AllGalleryState,
      action: PayloadAction<Gallery[]>
    ) => {
      state.gallery = action.payload;
    },
  },
});

export const { setAllGallery } = allGallerySlice.actions;

export default allGallerySlice.reducer;
