import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { initialState } from "../store/initialState";

export const components = createSlice({
  name: "components",
  initialState: initialState.components,
  reducers: {
    updateEditUserModalVisible: (state, action: PayloadAction<boolean>) => {
      state.editUserModal.visible = action.payload;
    },
    updateErrorModalVisible: (state, action: PayloadAction<boolean>) => {
      state.errorModal.visible = action.payload;
    },
    updateErrorModalMessage: (state, action: PayloadAction<string>) => {
      state.errorModal.message = action.payload;
    },
  },
});

export const selectEditUserModalVisible = (state: RootState) =>
  state.components.editUserModal.visible;

export const selectErrorModalVisible = (state: RootState) =>
  state.components.errorModal.visible;

export const selectErrorModalMessage = (state: RootState) =>
  state.components.errorModal.message;

export const {
  updateEditUserModalVisible,
  updateErrorModalVisible,
  updateErrorModalMessage,
} = components.actions;

export default components.reducer;
