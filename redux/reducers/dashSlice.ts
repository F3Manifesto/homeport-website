import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DashBoardState {
  value: string;
}

const initialDashboardState: DashBoardState = {
  value: "DROP_TYPES",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    setType: (state: DashBoardState, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setType } = dashboardSlice.actions;

export default dashboardSlice.reducer;
