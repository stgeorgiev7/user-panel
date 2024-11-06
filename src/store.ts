import { configureStore } from "@reduxjs/toolkit";
import editModalReducer from "./features/editModalSlice";

const store = configureStore({
  reducer: {
    editModal: editModalReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;

export default store;
