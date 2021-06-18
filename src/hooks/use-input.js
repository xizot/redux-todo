import { useReducer } from "react";

const initialState = {
    value: "",
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    if (action.type === "INPUT") {
        return { ...state, value: action.value };
    }
    if (action.type === "BLUR") {
        return { ...state, isTouched: true };
    }
    if (action.type === "RESET") {
        return initialState;
    }
    return initialState;
};
export const useInput = (validateFn) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialState);
    const valueIsValid = validateFn(inputState.value);
    const hasError = inputState.isTouched && !valueIsValid;

    const valueInputChangeHandler = (event) => {
        dispatch({
            type: "INPUT",
            value: event.target.value,
        });
    };
    const valueInputBlurHandler = () => {
        dispatch({ type: "BLUR" });
    };
    const inputResetHandler = () => {
        dispatch({ type: "RESET" });
    };
    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueInputChangeHandler,
        valueInputBlurHandler,
        inputResetHandler,
    };
};
