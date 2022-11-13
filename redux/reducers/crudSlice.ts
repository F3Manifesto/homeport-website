import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CrudState {
  value: string;
  id: string | undefined;
}

const initialCrudState: CrudState = {
  value: "IDLE",
  id: undefined,
};

export const crudSlice = createSlice({
  name: "crud",
  initialState: initialCrudState,
  reducers: {
    addDropType: (state: CrudState) => {
      state.value = "ADD_DROP_TYPE";
    },
    updateDropType: (state: CrudState, action: PayloadAction<string>) => {
      state.value = "UPDATE_DROP_TYPE";
      state.id = action.payload;
    },
    deleteDropType: (state: CrudState) => {
      state.value = "DELETE_DROP_TYPE";
    },
  },
});

export const { addDropType, updateDropType, deleteDropType } =
  crudSlice.actions;

export default crudSlice.reducer;
