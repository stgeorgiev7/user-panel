import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { initialState } from "../store/initialState";
import { UserInterface } from "../types";

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: initialState.allUsers,
  reducers: {
    updateAllUsers: (state, action: PayloadAction<UserInterface[]>) =>
      (state = action.payload),

    updateSingleUser: (state, action: PayloadAction<UserInterface>) => {
      const updatedUser = action.payload;
      // const index = state.findIndex((user) => user.id === updatedUser.id);
      // if (index !== -1) {
      //   state[index] = {
      //     ...state[index],
      //     ...updatedUser,
      //   };
      // }
      return state.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
    },
  },
});

export const selectAllUsers = (state: RootState) => state.allUsers;

export const { updateAllUsers, updateSingleUser } = allUsersSlice.actions;

export default allUsersSlice.reducer;
