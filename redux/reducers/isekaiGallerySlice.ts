import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gallery } from "../../components/Home/types/home.types";

export interface IsekaiGalleryState {
  gallery: Gallery[];
}

const initialIsekaiGalleryState: IsekaiGalleryState = {
  gallery: [],
};

export const isekaiGallerySlice = createSlice({
  name: "isekaiGallery",
  initialState: initialIsekaiGalleryState,
  reducers: {
    setIsekaiGallery: (
      state: IsekaiGalleryState,
      action: PayloadAction<Gallery[]>
    ) => {
      state.gallery = action.payload;
    },
  },
});

export const { setIsekaiGallery } = isekaiGallerySlice.actions;

export default isekaiGallerySlice.reducer;
