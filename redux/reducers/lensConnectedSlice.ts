import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../graphql/generated";

export interface LensConnectedState {
  profile: Profile | undefined;
}

const initialLensConnectedState: LensConnectedState = {
  profile: undefined,
};

export const lensConnectedSlice = createSlice({
  name: "lensConnected",
  initialState: initialLensConnectedState,
  reducers: {
    setLensConnected: (
      state: LensConnectedState,
      action: PayloadAction<Profile | undefined>
    ) => {
      state.profile = action.payload;
    },
  },
});

export const { setLensConnected } = lensConnectedSlice.actions;

export default lensConnectedSlice.reducer;
