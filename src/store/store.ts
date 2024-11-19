import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/usersSlice";
import componentsReducer from "../features/componentsSlice";
import taskSliceReducer from "../features/tasksSlice";
import postSliceReducer from "../features/postSlice";
import errorMiddleware from "../features/errorMiddleware";

const store = configureStore({
  reducer: {
    users: usersReducer,
    components: componentsReducer,
    tasks: taskSliceReducer,
    posts: postSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
