import { createSlice } from "@reduxjs/toolkit";
import {
  SimpleCollectOpenActionSettings,
  MultirecipientFeeCollectOpenActionSettings,
  Profile,
} from "../../graphql/generated";

export interface FollowCollectState {
  type: "follow" | "collect" | undefined;
  collect?: {
    item:
      | SimpleCollectOpenActionSettings
      | MultirecipientFeeCollectOpenActionSettings
      | undefined;
    stats: number | undefined;
    id: string;
  };
  follower?: Profile | undefined;
}

const initialFollowCollectState: FollowCollectState = {
  type: undefined,
};

export const followCollectSlice = createSlice({
  name: "followCollect",
  initialState: initialFollowCollectState,
  reducers: {
    setFollowCollect: (
      state: FollowCollectState,
      { payload: { actionType, actionCollect, actionFollower } }
    ) => {
      state.type = actionType;
      state.collect = actionCollect;
      state.follower = actionFollower;
    },
  },
});

export const { setFollowCollect } = followCollectSlice.actions;

export default followCollectSlice.reducer;
