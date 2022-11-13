import { createSlice } from "@reduxjs/toolkit";

export interface DisplayState {
  value: string;
  id?: string;
}

const initialDisplayState: DisplayState = {
  value: "DROP_TYPES_DISPLAY",
  id: undefined,
};

export const displaySlice = createSlice({
  name: "dashboard",
  initialState: initialDisplayState,
  reducers: {
    setDisplay: (
      state: DisplayState,
      { payload: { actionValue, actionId } }
    ) => {
      state.value = actionValue;
      state.id = actionId;
    },
  },
});

export const { setDisplay } = displaySlice.actions;

export default displaySlice.reducer;
