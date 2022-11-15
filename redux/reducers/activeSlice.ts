import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ActiveState {
  value?: string;
}

const initialActiveState: ActiveState = {
  value: undefined,
};

export const activeSlice = createSlice({
  name: "active",
  initialState: initialActiveState,
  reducers: {
    setActive: (state: ActiveState, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setActive } = activeSlice.actions;

export default activeSlice.reducer;
