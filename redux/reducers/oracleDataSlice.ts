import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OracleData } from "../../components/Modals/types/modals.types";

export interface OracleDataState {
  data: OracleData[];
}

const initialOracleDataState: OracleDataState = {
  data: [],
};

export const oracleDataSlice = createSlice({
  name: "oracleData",
  initialState: initialOracleDataState,
  reducers: {
    setOracleData: (
      state: OracleDataState,
      action: PayloadAction<OracleData[]>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setOracleData } = oracleDataSlice.actions;

export default oracleDataSlice.reducer;
