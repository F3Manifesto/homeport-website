import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "./reducers/crudSlice";
import dashReducer from "./reducers/dashSlice";
import displayReducer from "./reducers/displaySlice";
import { combineReducers } from "redux";

const reducer = combineReducers({
  crudReducer,
  dashReducer,
  displayReducer,
});

export const store = configureStore({
  reducer: {
    app: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
