import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AdminPaymentState {
  value?: string;
}

const initialAdminPaymentState: AdminPaymentState = {
  value: undefined,
};

export const adminPaymentSlice = createSlice({
  name: "adminPayment",
  initialState: initialAdminPaymentState,
  reducers: {
    setAdminPayment: (
      state: AdminPaymentState,
      action: PayloadAction<string>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setAdminPayment } = adminPaymentSlice.actions;

export default adminPaymentSlice.reducer;
