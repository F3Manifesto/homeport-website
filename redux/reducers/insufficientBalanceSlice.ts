import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InsufficientBalanceState {
  value: boolean;
  message?: string;
}

const initialInsufficientBalanceState: InsufficientBalanceState = {
  value: false,
};

export const InsufficientBalanceSlice = createSlice({
  name: "InsufficientBalance",
  initialState: initialInsufficientBalanceState,
  reducers: {
    setInsufficientBalance: (
      state: InsufficientBalanceState,
      { payload: { actionMessage, actionValue } }
    ) => {
      state.message = actionMessage;
      state.value = actionValue;
    },
  },
});

export const { setInsufficientBalance } = InsufficientBalanceSlice.actions;

export default InsufficientBalanceSlice.reducer;
