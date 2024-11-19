import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { initialState } from "../store/initialState";
import { UserInterface } from "../types";
import { fetchUserData } from "../api/requests";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetchUserData();
  return response.data;
});

export const users = createSlice({
  name: "users",
  initialState: initialState.usersState,
  reducers: {
    updateSingleUser: (state, action: PayloadAction<UserInterface>) => {
      const updatedUser = action.payload;
      const updatedArr = state.allUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
      state.allUsers = updatedArr;
    },
    updateSelectedUser: (
      state,
      action: PayloadAction<UserInterface | null>
    ) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allUsers.push(...action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users.allUsers;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectSelectedUser = (state: RootState) =>
  state.users.selectedUser;

export const { updateSingleUser, updateSelectedUser } = users.actions;

export default users.reducer;
