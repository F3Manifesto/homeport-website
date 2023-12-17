import { createSlice } from "@reduxjs/toolkit";
import { SimpleCollectOpenActionModuleInput } from "../../graphql/generated";

export interface PostCollectState {
  id?: string;
  collectTypes?: {
    [key: string]: SimpleCollectOpenActionModuleInput | undefined;
  };
}

const initialPostCollectState: PostCollectState = {
  collectTypes: {},
};

export const postCollectSlice = createSlice({
  name: "postCollect",
  initialState: initialPostCollectState,
  reducers: {
    setPostCollect: (
      state: PostCollectState,
      { payload: { actionId, actionCollectTypes } }
    ) => {
      state.id = actionId;
      state.collectTypes = actionCollectTypes;
    },
  },
});

export const { setPostCollect } = postCollectSlice.actions;

export default postCollectSlice.reducer;
