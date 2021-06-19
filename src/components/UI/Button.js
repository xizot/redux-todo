import classes from "./Button.module.css";

const Button = ({ text, onClick, buttonConfig }) => {
    const buttonClasses = `${classes.button} ${
        buttonConfig?.alt ? classes["button-alt"] : ""
    }`;

    return (
        <button onClick={onClick} {...buttonConfig} className={buttonClasses}>
            {text}
        </button>
    );
};
export default Button;
