import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "./reducers/crudSlice";
import dashReducer from "./reducers/dashSlice";
import dropReducer from "./reducers/dropSlice";
import productReducer from "./reducers/productSlice";
import dropFormatReducer from "./reducers/dropFormatSlice";
import dropTypeReducer from "./reducers/dropTypeSlice";
import itemReducer from "./reducers/itemSlice";
import priceReducer from "./reducers/priceSlice";
import currencyReducer from "./reducers/currencySlice";
import activeReducer from "./reducers/activeSlice";
import userReducer from "./reducers/userSlice";
import selectedDropReducer from "./reducers/selectedDropSlice";
import { combineReducers } from "redux";

const reducer = combineReducers({
  crudReducer,
  dashReducer,
  dropReducer,
  productReducer,
  dropTypeReducer,
  dropFormatReducer,
  itemReducer,
  priceReducer,
  currencyReducer,
  activeReducer,
  selectedDropReducer,
  userReducer,
});

export const store = configureStore({
  reducer: {
    app: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;