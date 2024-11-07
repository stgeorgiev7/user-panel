import { configureStore } from "@reduxjs/toolkit";
import selectedUserReducer from "../features/selectedUserSlice";
// import editModalReducer from "../features/editModalSlice";

const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
