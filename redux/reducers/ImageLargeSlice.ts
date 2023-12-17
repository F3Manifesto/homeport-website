import { createSlice } from "@reduxjs/toolkit";

export interface ImageViewerState {
  value: boolean;
  image: string;
}

const initialImageViewerState: ImageViewerState = {
  value: false,
  image: "",
};

export const imageViewerSlice = createSlice({
  name: "imageViewer",
  initialState: initialImageViewerState,
  reducers: {
    setImageViewer: (
      state: ImageViewerState,
      { payload: { actionValue, actionImage } }
    ) => {
      state.value = actionValue;
      state.image = actionImage;
    },
  },
});

export const { setImageViewer } = imageViewerSlice.actions;

export default imageViewerSlice.reducer;
