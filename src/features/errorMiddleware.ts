import { Middleware, isRejected } from "@reduxjs/toolkit";
import {
  updateErrorModalMessage,
  updateErrorModalVisible,
} from "./componentsSlice";

const errorMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  if (isRejected(action)) {
    const error = action.payload || action.error;
    console.log(error);
    const errorMessage =
      (error as Error)?.message || "An unknown error occurred";

    store.dispatch(updateErrorModalMessage(errorMessage));
    store.dispatch(updateErrorModalVisible(true));
  }

  return next(action);
};

export default errorMiddleware;
