import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MainImageState {
  value?: string;
}

const initialMainImageState: MainImageState = {
  value: undefined,
};

export const mainImageSlice = createSlice({
  name: "mainImage",
  initialState: initialMainImageState,
  reducers: {
    setMain: (state: MainImageState, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setMain } = mainImageSlice.actions;

export default mainImageSlice.reducer;
