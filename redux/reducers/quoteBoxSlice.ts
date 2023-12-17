import { createSlice } from "@reduxjs/toolkit";
import { PrimaryPublication } from "../../graphql/generated";

export interface QuoteBoxState {
  open?: boolean;
  quote?: PrimaryPublication;
}

const initialQuoteBoxState: QuoteBoxState = {};

export const quoteBoxSlice = createSlice({
  name: "quoteBox",
  initialState: initialQuoteBoxState,
  reducers: {
    setQuoteBox: (
      state: QuoteBoxState,
      { payload: { actionOpen, actionQuote } }
    ) => {
      state.open = actionOpen;
      state.quote = actionQuote;
    },
  },
});

export const { setQuoteBox } = quoteBoxSlice.actions;

export default quoteBoxSlice.reducer;
