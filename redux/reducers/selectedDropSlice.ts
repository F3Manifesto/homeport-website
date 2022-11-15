import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedState {
  name?: string;
  slug?: string;
  description?: string;
  dropType?: string;
}

const initialPriceState: SelectedState = {
  name: undefined,
  slug: undefined,
  description: undefined,
  dropType: undefined,
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState: initialPriceState,
  reducers: {
    setSelected: (
      state: SelectedState,
      { payload: { actionName, actionSlug, actionDescription, actionDropType } }
    ) => {
      state.name = actionName;
      state.slug = actionSlug;
      state.description = actionDescription;
      state.dropType = actionDropType;
    },
  },
});

export const { setSelected } = selectedSlice.actions;

export default selectedSlice.reducer;
