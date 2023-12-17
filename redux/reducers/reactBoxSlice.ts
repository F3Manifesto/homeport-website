import { createSlice } from "@reduxjs/toolkit";

export interface ReactBoxState {
  open: boolean;
  id?: string;
  type?: "Mirrors" | "Likes" | "Followers" | "Following" | "Acts";
}

const initialReactBoxState: ReactBoxState = {
  open: false,
};

export const reactBoxSlice = createSlice({
  name: "reactBox",
  initialState: initialReactBoxState,
  reducers: {
    setReactBox: (
      state: ReactBoxState,
      { payload: { actionOpen, actionType, actionId } }
    ) => {
      state.open = actionOpen;
      state.type = actionType;
      state.id = actionId;
    },
  },
});

export const { setReactBox } = reactBoxSlice.actions;

export default reactBoxSlice.reducer;
