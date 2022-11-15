import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DropTypeState {
  value: string;
}

const initialDropTypeState: DropTypeState = {
  value: "Select Drop Type",
};

export const dropTypeSlice = createSlice({
  name: "dropType",
  initialState: initialDropTypeState,
  reducers: {
    setDropType: (state: DropTypeState, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setDropType } = dropTypeSlice.actions;

export default dropTypeSlice.reducer;
