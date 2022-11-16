import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: boolean;
  id?: string;
}

const initialUserState: UserState = {
  value: false,
  id: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state: UserState, { payload: { actionValue, actionId } }) => {
      state.value = actionValue;
      state.id = actionId;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
