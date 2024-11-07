import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { initialState } from "../store/initialState";
import { userInterface } from "../types";

export const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState: initialState.selectedUser,
  reducers: {
    updateSelectedUser: (
      state: userInterface,
      action: PayloadAction<userInterface>
    ) => (state = action.payload),
  },
});

export const selectSelectedUser = (state: RootState) => state.selectedUser;

export const { updateSelectedUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
