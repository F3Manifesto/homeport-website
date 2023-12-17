import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InteractErrorState {
  value: boolean;
}

const initialInteractErrorState: InteractErrorState = {
  value: false,
};

export const interactErrorSlice = createSlice({
  name: "interactError",
  initialState: initialInteractErrorState,
  reducers: {
    setInteractError: (
      state: InteractErrorState,
      action: PayloadAction<boolean>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setInteractError } = interactErrorSlice.actions;

export default interactErrorSlice.reducer;
