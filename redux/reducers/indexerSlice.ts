import { createSlice } from "@reduxjs/toolkit";

export interface IndexerState {
  open: boolean;
  message: string | undefined;
}

const initialIndexerState: IndexerState = {
  open: false,
  message: undefined,
};

export const indexerSlice = createSlice({
  name: "indexer",
  initialState: initialIndexerState,
  reducers: {
    setIndexer: (
      state: IndexerState,
      { payload: { actionOpen, actionMessage } }
    ) => {
      state.open = actionOpen;
      state.message = actionMessage;
    },
  },
});

export const { setIndexer } = indexerSlice.actions;

export default indexerSlice.reducer;
