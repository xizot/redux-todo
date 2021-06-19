import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        currentTasks: [],
        isShownModal: false,
        completedTasks: [],
    },
    reducers: {
        replaceTasks(state, action) {
            state.currentTasks = [...action.payload];
        },
        replaceCompletedTasks(state, action) {
            state.completedTasks = [...action.payload];
        },
        addTask(state, action) {
            const newTask = action.payload;
            state.currentTasks.push(newTask);
        },
        removeTask(state, action) {
            const id = action.payload;
            state.currentTasks = state.currentTasks.filter(
                (task) => task.id !== id
            );
            state.completedTasks = state.completedTasks.filter(
                (task) => task.id !== id
            );
        },
        updateTask(state, action) {
            const { id, title } = action.payload;
            const existingCurrentTaskIndex = state.currentTasks.findIndex(
                (task) => task.id === id
            );
            const existingCompletedTaskIndex = state.completedTasks.findIndex(
                (task) => task.id === id
            );
            existingCurrentTaskIndex !== -1 &&
                (state.currentTasks[existingCurrentTaskIndex].title = title);
            existingCompletedTaskIndex !== -1 &&
                (state.completedTasks[existingCompletedTaskIndex].title =
                    title);
            state.isShownModal = false;
        },
        toggleCompleted(state, action) {
            const id = action.payload;
            const existingCurrentTaskIndex = state.currentTasks.findIndex(
                (task) => task.id === id
            );
            const existingCompletedTaskIndex = state.completedTasks.findIndex(
                (task) => task.id === id
            );
            if (existingCurrentTaskIndex !== -1) {
                state.currentTasks[existingCurrentTaskIndex].isDone = true;
                state.completedTasks.push(
                    state.currentTasks[existingCurrentTaskIndex]
                );
                state.currentTasks = state.currentTasks.filter(
                    (task) =>
                        task.id !==
                        state.currentTasks[existingCurrentTaskIndex].id
                );
            }
            if (existingCompletedTaskIndex !== -1) {
                state.completedTasks[existingCompletedTaskIndex].isDone = false;
                state.currentTasks.push(
                    state.completedTasks[existingCompletedTaskIndex]
                );
                state.completedTasks = state.completedTasks.filter(
                    (task) =>
                        task.id !==
                        state.completedTasks[existingCompletedTaskIndex].id
                );
            }
        },
        showModal(state) {
            state.isShownModal = true;
        },
        closeModal(state) {
            state.isShownModal = false;
        },
    },
});
export const tasksActions = tasksSlice.actions;
export default tasksSlice;
