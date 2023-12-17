import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LensConnectModalState {
  value: boolean;
}

const initialLensConnectModalState: LensConnectModalState = {
  value: false,
};

export const lensConnectModalSlice = createSlice({
  name: "lensConnectModal",
  initialState: initialLensConnectModalState,
  reducers: {
    setLensConnectModal: (
      state: LensConnectModalState,
      action: PayloadAction<boolean>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setLensConnectModal } = lensConnectModalSlice.actions;

export default lensConnectModalSlice.reducer;
