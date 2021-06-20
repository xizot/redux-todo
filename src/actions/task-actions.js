import axios from "axios";
import { createBrowserHistory } from "history";
import { useAuthorization } from "../helpers";
import { tasksActions } from "../reducers/task";

export const getTasks = () => async (dispatch) => {
    const headers = useAuthorization();
    if (!headers) {
        createBrowserHistory().push("/login");
        return;
    }

    const fetchTasks = async () => {
        dispatch(tasksActions.fetchingData());
        dispatch(tasksActions.resetErrorState());
        const tasks = await axios.get(
            `${process.env.REACT_APP_BACKEND_URI}/todo`,
            {
                headers,
            }
        );

        const tasksData = tasks.data;
        dispatch(tasksActions.replaceCurrentTasks(tasksData));
    };

    try {
        await fetchTasks();
    } catch (error) {
        const errorMessage = error.response?.message || "Something went wrong!";
        dispatch(
            tasksActions.getTasksError({
                errorMessage,
            })
        );
    }
};

export const deleteTask = (taskId) => async (dispatch) => {
    const headers = useAuthorization();

    if (!headers) {
        createBrowserHistory().push("/login");
        return;
    }
    const httpDeleteTask = async () => {
        dispatch(tasksActions.resetErrorState());
        const response = await axios.delete(
            `${process.env.REACT_APP_BACKEND_URI}/todo/${taskId}`,
            {
                headers,
            }
        );

        const responseData = response.data;
        dispatch(tasksActions.removeTask(responseData.data?.taskId));
    };
    try {
        await httpDeleteTask();
    } catch (error) {
        const errorMessage = error.response?.message || "Something went wrong!";
        dispatch(tasksActions.taskErrorHandler(errorMessage));
    }
};

export const addTask = (title) => async (dispatch) => {
    const headers = useAuthorization();
    if (!headers) {
        createBrowserHistory().push("/login");
        return;
    }
    const httpAddTask = async () => {
        dispatch(tasksActions.resetErrorState());
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URI}/todo`,
            {
                title,
            },
            {
                headers,
            }
        );

        const responseData = response.data;
        dispatch(tasksActions.addTask(responseData.data));
    };
    try {
        await httpAddTask();
    } catch (error) {
        const errorMessage = error.response?.message || "Something went wrong!";
        dispatch(tasksActions.taskErrorHandler(errorMessage));
    }
};

export const updateTitle =
    ({ taskId, title }) =>
    async (dispatch) => {
        const headers = useAuthorization();
        if (!headers) {
            createBrowserHistory().push("/login");
            return;
        }
        const httpUpdateTitle = async () => {
            dispatch(tasksActions.resetErrorState());
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_URI}/todo`,
                {
                    taskId,
                    title,
                },
                {
                    headers,
                }
            );

            const responseData = response.data;
            dispatch(tasksActions.updateTitle(responseData.data));
        };
        try {
            await httpUpdateTitle();
        } catch (error) {
            const errorMessage =
                error.response?.message || "Something went wrong!";
            dispatch(tasksActions.taskErrorHandler(errorMessage));
        }
    };

export const toggleCompleted =
    ({ taskId, isDone }) =>
    async (dispatch) => {
        const headers = useAuthorization();
        if (!headers) {
            createBrowserHistory().push("/login");
            return;
        }
        const httpAddTask = async () => {
            dispatch(tasksActions.resetErrorState());
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_URI}/todo`,
                {
                    taskId,
                    isDone: !isDone,
                },
                {
                    headers,
                }
            );

            const responseData = response.data;
            dispatch(tasksActions.updateComplete(responseData.data));
        };
        try {
            await httpAddTask();
        } catch (error) {
            const errorMessage =
                error.response?.message || "Something went wrong!";
            dispatch(tasksActions.taskErrorHandler(errorMessage));
        }
    };
