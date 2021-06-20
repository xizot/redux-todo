import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        registerSuccessMessage: null,
        registerError: null,
        loginError: null,
    },
    reducers: {
        verifiedToken(state) {
            state.isAuthenticated = true;
            state.accessToken = localStorage.getItem("accessToken");
            state.refreshToken = localStorage.getItem("refreshToken");
            state.registerError = null;
            state.loginError = null;
        },
        loginSucceeded(state, action) {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;

            state.registerError = null;
            state.loginError = null;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        },
        loginFailed(state, action) {
            state.loginError = action.payload;
        },
        registerFailed(state, action) {
            state.registerError = action.payload;
        },
        registerSucceeded(state, action) {
            state.registerSuccessMessage = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
        resetError(state) {
            state.loginError = null;
            state.registerError = null;
        },
        resetState(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.registerSuccessMessage = null;
            state.registerError = null;
            state.loginError = null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
