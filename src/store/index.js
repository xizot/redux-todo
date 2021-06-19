import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/auth";
import tasksSlice from "../reducers/task";

const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
        auth: authSlice.reducer,
    },
});
export default store;
