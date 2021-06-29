import { useEffect } from "react";
import classes from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../actions/auth-actions";
import { authActions } from "../../reducers/auth";
import { useInput } from "./../../hooks/use-input";
import { isEmpty, isGreaterThreeCharacters } from "./../../helpers/index";
import Input from "./../../components/UI/Input";
import Button from "./../../components/UI/Button";

const Login = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isRequesting = useSelector((state) => state.auth.isRequesting);
    const errorResponse = useSelector((state) => state.auth.errorResponse);
    const dispatch = useDispatch();
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

        dispatch(
            login({ username: usernameEntered, password: passwordEntered })
        );
    };
    useEffect(() => {
        dispatch(authActions.resetError());
    }, [dispatch]);
    if (isAuthenticated) return <Redirect to="/" />;

    return (
        <div className={classes.login}>
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
                {errorResponse && (
                    <p className={classes["login-failed"]}>{errorResponse}</p>
                )}
                <div className="form-actions">
                    <Button
                        buttonConfig={{
                            disabled: !formIsValid,
                            alt: "true",
                        }}
                        text={isRequesting ? "Signing in..." : "Sign in"}
                    />
                </div>
                <div className={classes["another-actions"]}>
                    <Link to="/register"> Create an account.</Link>
                </div>
            </form>
        </div>
    );
};
export default Login;
