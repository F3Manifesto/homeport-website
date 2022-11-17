import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DraftImagesState {
  value?: string[];
}

const initialDraftImagesState: DraftImagesState = {
  value: [],
};

export const draftImagesSlice = createSlice({
  name: "draftImages",
  initialState: initialDraftImagesState,
  reducers: {
    setDraftImages: (
      state: DraftImagesState,
      action: PayloadAction<string[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setDraftImages } = draftImagesSlice.actions;

export default draftImagesSlice.reducer;
