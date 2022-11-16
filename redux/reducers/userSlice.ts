import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: boolean;
  id?: string;
  username?: string;
}

const initialUserState: UserState = {
  value: false,
  id: undefined,
  username: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (
      state: UserState,
      { payload: { actionValue, actionId, actionUsername } }
    ) => {
      state.value = actionValue;
      state.id = actionId;
      state.username = actionUsername;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
