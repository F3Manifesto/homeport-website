import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DraftState {
  id?: string;
  title?: string;
  description?: string;
  productImages?: string[];
  type?: string;
}

const initialDraftState: DraftState = {
  id: undefined,
  title: undefined,
  description: undefined,
  productImages: undefined,
  type: "ADD_DRAFT",
};
export const draftSlice = createSlice({
  name: "draft",
  initialState: initialDraftState,
  reducers: {
    setDraft: (
      state: DraftState,
      {
        payload: {
          actionId,
          actionTitle,
          actionDescription,
          actionProductImages,
          actionType,
        },
      }
    ) => {
      state.id = actionId;
      state.title = actionTitle;
      state.description = actionDescription;
      state.productImages = actionProductImages;
      state.type = actionType;
    },
  },
});

export const { setDraft } = draftSlice.actions;

export default draftSlice.reducer;
