import classes from "./Input.module.css";

const Input = ({
    inputConfig,
    onInputBlur,
    onInputChange,
    hasError,
    errorMessage,
    autocompelete,
}) => {
    const inputClasses = `${classes.control} ${
        hasError ? classes.invalid : ""
    }`;
    return (
        <div className={inputClasses}>
            <label htmlFor={inputConfig.id}>{inputConfig.label}</label>
            <input
                {...inputConfig}
                onChange={onInputChange}
                onBlur={onInputBlur}
                autoComplete={autocompelete}
            />
            {hasError && <p>{errorMessage}</p>}
        </div>
    );
};

export default Input;
