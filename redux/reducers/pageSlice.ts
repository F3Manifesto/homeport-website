import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  value?: string;
}

const initialPageState: PageState = {
  value: undefined,
};

export const pageSlice = createSlice({
  name: "page",
  initialState: initialPageState,
  reducers: {
    setPage: (state: PageState, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
