import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gallery } from "../../types/general.types";

export interface FilterConstantsState {
  constants: {
    sexes: string[];
    styles: string[];
    drops: string[];
  };
}

const initialFilterConstantsState: FilterConstantsState = {
  constants: {
    sexes: [],
    styles: [],
    drops: [],
  },
};

export const filterConstantsSlice = createSlice({
  name: "filterConstants",
  initialState: initialFilterConstantsState,
  reducers: {
    setFilterConstants: (
      state: FilterConstantsState,
      action: PayloadAction<{
        sexes: string[];
        styles: string[];
        drops: string[];
      }>
    ) => {
      state.constants = action.payload;
    },
  },
});

export const { setFilterConstants } = filterConstantsSlice.actions;

export default filterConstantsSlice.reducer;
