import { configureStore } from "@reduxjs/toolkit";
import selectedUserReducer from "../features/selectedUserSlice";
import allUsersReducer from "../features/allUsersSlice";
import componentsReducer from "../features/componentsSlice";
import taskSliceReducer from "../features/tasksSlice";

const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
    allUsers: allUsersReducer,
    components: componentsReducer,
    tasks: taskSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
