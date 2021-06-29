import axios from "axios";
import { useAuthorization } from "../helpers";
import { authActions } from "../reducers/auth";
export const login =
    ({ username, password }) =>
    async (dispatch) => {
        const httpLogin = async () => {
            dispatch(authActions.resetState());
            dispatch(authActions.sendRequest());
            const response = await axios.post(
                `${process.env.REACT_APP_AUTH_URI}/auth/login`,
                {
                    username,
                    password,
                }
            );
            const { accessToken, refreshToken } = response.data;
            dispatch(
                authActions.loginSucceeded({
                    accessToken,
                    refreshToken,
                })
            );
        };

        try {
            await httpLogin();
        } catch (error) {
            dispatch(
                authActions.requestError(
                    error?.response?.data?.error || "Something went wrong!"
                )
            );
        }
    };

export const register =
    ({ fullname, username, password }) =>
    async (dispatch) => {
        const httpRegister = async () => {
            dispatch(authActions.resetState());
            dispatch(authActions.sendRequest());
            const response = await axios.post(
                `${process.env.REACT_APP_AUTH_URI}/auth/register`,
                { fullname, username, password }
            );
            const { message } = response.data;
            dispatch(authActions.registerSucceeded(message));
        };

        try {
            await httpRegister();
        } catch (error) {
            dispatch(
                authActions.requestError(
                    error?.response?.data?.error || "Something went wrong!"
                )
            );
        }
    };

export const verifyToken = () => async (dispatch) => {
    const headers = useAuthorization();
    if (!headers) {
        return;
    }
    const httpVerify = async () => {
        dispatch(authActions.resetState());
        await axios.post(
            `${process.env.REACT_APP_AUTH_URI}/auth/verify-token`,
            {},
            {
                headers,
            }
        );
        dispatch(authActions.verifiedToken());
    };

    try {
        await httpVerify();
    } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
};
export const logout = () => async (dispatch) => {
    const headers = useAuthorization();
    if (!headers) {
        return;
    }
    const httpLogout = async () => {
        dispatch(authActions.resetState());
        await axios.get(`${process.env.REACT_APP_AUTH_URI}/auth/logout`, {
            headers,
        });
        dispatch(authActions.logout());
    };

    try {
        await httpLogout();
    } catch (error) {
        dispatch(authActions.logout());
    }
};
