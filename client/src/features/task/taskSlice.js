import { createSlice } from "@reduxjs/toolkit";
import {
    createTask,
    fetchTasks,
    fetchTaskById,
    updateStatus,
    updateTask,
    deleteTask,
} from "./taskThunks";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to fetch tasks";
            })
            .addCase(fetchTaskById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTaskById.fulfilled, (state, action) => {
                state.loading = false;
                // If the task with the same ID already exists, replace it, otherwise, add it to the list
                const existingTaskIndex = state.tasks.findIndex(
                    (task) => task._id === action.payload._id
                );
                if (existingTaskIndex !== -1) {
                    state.tasks[existingTaskIndex] = action.payload;
                } else {
                    state.tasks.push(action.payload);
                }
            })
            .addCase(fetchTaskById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to fetch task by ID";
            })
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to create task";
            })
            .addCase(updateStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedTaskIndex = state.tasks.findIndex(
                    (task) => task._id === action.payload._id
                );
                if (updatedTaskIndex !== -1) {
                    state.tasks[updatedTaskIndex] = action.payload;
                }
            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to mark completed";
            })
            
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                const updatedTaskIndex = state.tasks.findIndex(
                    (task) => task._id === action.payload._id
                );
                if (updatedTaskIndex !== -1) {
                    state.tasks[updatedTaskIndex] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to update task";
            })

            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(
                    (task) => task._id !== action.payload
                );
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to delete task";
            });
    },
});

export default taskSlice.reducer;
