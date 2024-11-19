import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { initialState } from "../store/initialState";
import { TaskInterface } from "../types";
import { fetchTaskData } from "../api/requests";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetchTaskData();
  return response.data;
});

export const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState.tasksState,
  reducers: {
    updateTaskCompletion: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      const { id, completed } = action.payload;
      const task = state.tasks.find((task: TaskInterface) => task.id === id);
      if (task) task.completed = completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(...action.payload);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export const selectAllTasks = (state: RootState) => state.tasks;
export const selectTasksStatus = (state: RootState) => state.tasks.status;

export const { updateTaskCompletion } = taskSlice.actions;

export default taskSlice.reducer;
