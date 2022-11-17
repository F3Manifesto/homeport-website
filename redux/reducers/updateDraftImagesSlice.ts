import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DraftUpdateImagesState {
  value?: string[];
}

const initialUpdateDraftImagesState: DraftUpdateImagesState = {
  value: [],
};

export const updateDraftImagesSlice = createSlice({
  name: "draftImagesUpdate",
  initialState: initialUpdateDraftImagesState,
  reducers: {
    setUpdateDraftImages: (
      state: DraftUpdateImagesState,
      action: PayloadAction<string[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setUpdateDraftImages } = updateDraftImagesSlice.actions;

export default updateDraftImagesSlice.reducer;
