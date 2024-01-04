import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface prevURLState {
  url: string;
}

const initialprevURLState: prevURLState = {
  url: "",
};

export const prevURLSlice = createSlice({
  name: "prevURL",
  initialState: initialprevURLState,
  reducers: {
    setprevURL: (
      state: prevURLState,
      action: PayloadAction<string>
    ) => {
      state.url = action.payload;
    },
  },
});

export const { setprevURL } = prevURLSlice.actions;

export default prevURLSlice.reducer;
