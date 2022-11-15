import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DropFormatState {
  value: string[];
}

const initialDropFormatState: DropFormatState = {
  value: [],
};

export const dropFormatSlice = createSlice({
  name: "dropFormat",
  initialState: initialDropFormatState,
  reducers: {
    setDropFormat: (
      state: DropFormatState,
      action: PayloadAction<string[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setDropFormat } = dropFormatSlice.actions;

export default dropFormatSlice.reducer;
