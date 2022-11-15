import { createSlice } from "@reduxjs/toolkit";

export interface CurrencyState {
  itemSlug?: string;
  itemName?: string;
  usd?: number;
  eth?: number;
  mona?: number;
  usdt?: number;
  matic?: number;
}

const initialCurrencyState: CurrencyState = {
  itemSlug: undefined,
  itemName: undefined,
  usd: undefined,
  eth: undefined,
  mona: undefined,
  usdt: undefined,
  matic: undefined,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState: initialCurrencyState,
  reducers: {
    setCurrency: (
      state: CurrencyState,
      {
        payload: {
          actionSlug,
          actionName,
          actionUSD,
          actionETH,
          actionMONA,
          actionUSDT,
          actionMATIC,
        },
      }
    ) => {
      state.itemSlug = actionSlug;
      state.itemName = actionName;
      state.usd = actionUSD;
      state.eth = actionETH;
      state.mona = actionMONA;
      state.usdt = actionUSDT;
      state.matic = actionMATIC;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
