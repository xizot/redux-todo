import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        isFetchingData: false,
        currentTasks: [],
        notCompletedTasks: [],
        isShownModal: false,
        completedTasks: [],
        error: null,
        errorHandler: null,
    },
    reducers: {
        fetchingData(state) {
            state.isFetchingData = true;
        },
        taskErrorHandler(state, action) {
            state.errorHandler = action.payload;
        },
        resetErrorState(state) {
            state.error = null;
            state.errorHandler = null;
        },
        getTasksError(state, action) {
            state.error = action.payload;
            state.isFetchingData = false;
        },
        replaceCurrentTasks(state, action) {
            state.isFetchingData = false;
            state.currentTasks = [...action.payload];
            state.completedTasks = [...action.payload].filter(
                (task) => task.isDone
            );
            state.notCompletedTasks = [...action.payload].filter(
                (task) => !task.isDone
            );
        },

        addTask(state, action) {
            const newTask = action.payload;
            state.currentTasks.unshift(newTask);
            state.notCompletedTasks.unshift(newTask);
        },
        removeTask(state, action) {
            const id = action.payload;
            state.currentTasks = state.currentTasks.filter(
                (task) => task.taskId !== id
            );
            state.notCompletedTasks = state.notCompletedTasks.filter(
                (task) => task.taskId !== id
            );
            state.completedTasks = state.completedTasks.filter(
                (task) => task.taskId !== id
            );
        },
        updateTitle(state, action) {
            const { taskId, title } = action.payload;
            const existingCurrentTaskIndex = state.currentTasks.findIndex(
                (task) => task.taskId === taskId
            );
            state.currentTasks[existingCurrentTaskIndex].title = title;
            state.completedTasks = state.currentTasks.filter(
                (task) => task.isDone
            );
            state.notCompletedTasks = state.currentTasks.filter(
                (task) => !task.isDone
            );

            state.isShownModal = false;
        },

        updateComplete(state, action) {
            const { taskId, isDone } = action.payload;

            const existingCurrentTaskIndex = state.currentTasks.findIndex(
                (task) => task.taskId === taskId
            );
            state.currentTasks[existingCurrentTaskIndex].isDone = isDone;
            state.completedTasks = state.currentTasks.filter(
                (task) => task.isDone
            );
            state.notCompletedTasks = state.currentTasks.filter(
                (task) => !task.isDone
            );
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
