import { configureStore } from "@reduxjs/toolkit";
import selectedUserReducer from "../features/selectedUserSlice";
import allUsersReducer from "../features/allUsersSlice";
import editUserModalReducer from "../features/editUserModalSlice";

const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
    allUsers: allUsersReducer,
    editUserModal: editUserModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
