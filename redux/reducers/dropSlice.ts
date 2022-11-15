import { createSlice } from "@reduxjs/toolkit";

export interface DropState {
  value: string;
  id?: string;
}

const initialDropState: DropState = {
  value: "DROP_TYPES_DISPLAY",
  id: undefined,
};

export const dropSlice = createSlice({
  name: "drop",
  initialState: initialDropState,
  reducers: {
    setDrop: (
      state: DropState,
      { payload: { actionValue, actionId } }
    ) => {
      state.value = actionValue;
      state.id = actionId;
    },
  },
});

export const { setDrop } = dropSlice.actions;

export default dropSlice.reducer;
