import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        response: {
            status: 200,
            message: "",
        },
    },
    reducers: {
        login(state, action) {
            const { username, password } = action.payload;
            if (username === "abc" && password === "123") {
                state.isAuthenticated = true;
                state.response.status = 200;
                state.response.message = "Login successfully";
            } else if (username === "abc") {
                state.response.status = 401;
                state.response.message =
                    "The password you entered was not valid.";
            } else {
                state.response.status = 401;
                state.response.message =
                    "The username you entered isn't connected to an account";
            }
        },
        register(state, action) {
            const { fullname, username, password } = action.payload;
            console.log(fullname, password);
            if (username !== "abc") {
                state.isAuthenticated = true;
                state.response.status = 200;
                state.response.message = "Register successfully";
            } else {
                state.response.status = 401;
                state.response.message = "The username is taken. Try another!";
            }
        },
        logout(state) {
            state.isAuthenticated = false;
        },
        resetResponse(state) {
            state.response.status = 200;
            state.response.message = "";
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
