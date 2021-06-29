import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        registerSuccessMessage: null,
        errorResponse: null,
        isRequesting: false,
    },
    reducers: {
        sendRequest(state) {
            state.isRequesting = true;
        },
        verifiedToken(state) {
            state.isAuthenticated = true;
            state.accessToken = localStorage.getItem("accessToken");
            state.refreshToken = localStorage.getItem("refreshToken");
            state.errorResponse = null;
        },
        loginSucceeded(state, action) {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;

            state.errorResponse = null;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            state.isRequesting = false;
        },
        requestError(state, action) {
            state.errorResponse = action.payload;
            state.isRequesting = false;
        },
        registerSucceeded(state, action) {
            state.registerSuccessMessage = action.payload;
            state.isRequesting = false;
        },
        logout(state) {
            state.isAuthenticated = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
        resetError(state) {
            state.errorResponse = null;
        },
        resetState(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.registerSuccessMessage = null;
            state.errorResponse = null;
            state.isRequesting = false;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
