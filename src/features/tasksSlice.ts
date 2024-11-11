import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { initialState } from "../store/initialState";
import { TaskInterface } from "../types";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState.tasks,
  reducers: {
    updateAllTasks: (state, action: PayloadAction<TaskInterface[]>) => {
      state = action.payload;
      return state;
    },

    updateTaskCompletion: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      const { id, completed } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) task.completed = completed;
    },
  },
});

export const selectAllTasks = (state: RootState) => state.tasks;

export const { updateAllTasks, updateTaskCompletion } = taskSlice.actions;

export default taskSlice.reducer;
