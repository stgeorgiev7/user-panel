import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { initialState } from "../store/initialState";
import { EditUserModalInterface } from "../types";

export const editUserModalSlice = createSlice({
  name: "editUserModal",
  initialState: initialState.components.editUserModal,
  reducers: {
    updateEditUserModalVisible: (
      state: EditUserModalInterface,
      action: PayloadAction<boolean>
    ) => {
      state.visible = action.payload;
    },
  },
});

export const selectEditUserModalVisible = (state: RootState) =>
  state.editUserModal.visible;

export const { updateEditUserModalVisible } = editUserModalSlice.actions;

export default editUserModalSlice.reducer;
