import { useInput } from "./../../hooks/use-input";
import Input from "./../../components/UI/Input";
import classes from "./LoginForm.module.css";
import Button from "../../components/UI/Button";
import { isEmpty, isGreaterThreeCharacters } from "../../helpers";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
    const loginError = useSelector((state) => state.auth.loginError);
    const {
        value: usernameEntered,
        hasError: usernameHasError,
        isValid: usernameIsValid,
        valueInputBlurHandler: usernameBlurHandler,
        valueInputChangeHandler: usernameChangeHandler,
    } = useInput(isEmpty);

    const {
        value: passwordEntered,
        hasError: passwordHasError,
        isValid: passwordIsValid,
        valueInputBlurHandler: passwordBlurHandler,
        valueInputChangeHandler: passwordChangeHandler,
    } = useInput(isGreaterThreeCharacters);

    const formIsValid = usernameIsValid && passwordIsValid;
    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }

        onLogin(usernameEntered, passwordEntered);
    };
    return (
        <form onSubmit={formSubmitHandler} className={classes.form}>
            <Input
                inputConfig={{
                    type: "text",
                    value: usernameEntered,
                    label: "User name",
                    id: "username",
                }}
                autocompelete="username"
                onInputBlur={usernameBlurHandler}
                onInputChange={usernameChangeHandler}
                hasError={usernameHasError}
                errorMessage="Please enter a valid username (3 characters long)!"
            />
            <Input
                inputConfig={{
                    type: "password",
                    value: passwordEntered,
                    label: "Password",
                    id: "password",
                }}
                autocompelete="current-password"
                onInputBlur={passwordBlurHandler}
                onInputChange={passwordChangeHandler}
                hasError={passwordHasError}
                errorMessage="Please enter a valid password!"
            />
            {loginError && (
                <p className={classes["login-failed"]}>{loginError}</p>
            )}
            <div className="form-actions">
                <Button
                    buttonConfig={{
                        disabled: !formIsValid,
                        alt: "true",
                    }}
                    text="Sign In"
                />
            </div>
            <div className={classes["another-actions"]}>
                <Link to="/register"> Create an account.</Link>
            </div>
        </form>
    );
};

export default LoginForm;
