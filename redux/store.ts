import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import walletConnectedReducer from "./reducers/walletConnectedSlice";
import lensConnectedReducer from "./reducers/lensConnectedSlice";
import oracleDataReducer from "./reducers/oracleDataSlice";
import ImageLargeReducer from "./reducers/ImageLargeSlice";
import allGalleryReducer from "./reducers/allGallerySlice";
import filterConstantsReducer from "./reducers/filterConstantsSlice";
import indexerReducer from "./reducers/indexerSlice";
import interactErrorReducer from "./reducers/interactErrorSlice";
import postCollectReducer from "./reducers/postCollectSlice";
import quoteBoxReducer from "./reducers/quoteBoxSlice";
import reactBoxReducer from "./reducers/reactBoxSlice";
import lensConnectModalSlice from "./reducers/lensConnectModalSlice";

const reducer = combineReducers({
  walletConnectedReducer,
  lensConnectedReducer,
  oracleDataReducer,
  ImageLargeReducer,
  allGalleryReducer,
  filterConstantsReducer,
  indexerReducer,
  interactErrorReducer,
  postCollectReducer,
  quoteBoxReducer,
  reactBoxReducer,
  lensConnectModalSlice
});

export const store = configureStore({
  reducer: {
    app: reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
