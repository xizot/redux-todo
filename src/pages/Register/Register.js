import { useInput } from "./../../hooks/use-input";
import Input from "./../../components/UI/Input";
import classes from "../Login/LoginForm.module.css";
import registerClasses from "./Register.module.css";
import Button from "../../components/UI/Button";
import { isGreaterThreeCharacters, isEmpty } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { authActions } from "../../reducers/auth";
import { useEffect } from "react";
const Register = (props) => {
    const {
        value: nameEntered,
        hasError: nameHasError,
        isValid: nameIsValid,
        valueInputBlurHandler: nameBlurHandler,
        valueInputChangeHandler: nameChangeHandler,
        inputResetHandler: nameReset,
    } = useInput(isEmpty);
    const {
        value: usernameEntered,
        hasError: usernameHasError,
        isValid: usernameIsValid,
        valueInputBlurHandler: usernameBlurHandler,
        valueInputChangeHandler: usernameChangeHandler,
        inputResetHandler: usernameReset,
    } = useInput(isGreaterThreeCharacters);

    const {
        value: passwordEntered,
        hasError: passwordHasError,
        isValid: passwordIsValid,
        valueInputBlurHandler: passwordBlurHandler,
        valueInputChangeHandler: passwordChangeHandler,
        inputResetHandler: passwordReset,
    } = useInput(isEmpty);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const { status: registerStatus, message: registerMessage } = useSelector(
        (state) => state.auth.response
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.resetResponse());
    }, [dispatch]);

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    const formIsValid = usernameIsValid && passwordIsValid && nameIsValid;

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        dispatch(
            authActions.register({
                fullname: nameEntered,
                username: usernameEntered,
                password: passwordEntered,
            })
        );
        usernameReset();
        passwordReset();
        nameReset();
    };
    return (
        <div className={registerClasses.register}>
            <form onSubmit={formSubmitHandler} className={classes.form}>
                <Input
                    inputConfig={{
                        type: "text",
                        value: nameEntered,
                        label: "Full Name",
                        id: "name",
                    }}
                    autocompelete="on"
                    onInputBlur={nameBlurHandler}
                    onInputChange={nameChangeHandler}
                    hasError={nameHasError}
                    errorMessage="Please enter a valid name!"
                />
                <Input
                    inputConfig={{
                        type: "text",
                        value: usernameEntered,
                        label: "Username",
                        id: "username",
                    }}
                    autocompelete="on"
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
                    autocompelete="on"
                    onInputBlur={passwordBlurHandler}
                    onInputChange={passwordChangeHandler}
                    hasError={passwordHasError}
                    errorMessage="Please enter a valid password!"
                />
                {registerStatus !== 200 && (
                    <p className={classes["login-failed"]}>{registerMessage}</p>
                )}
                <div className="form-actions">
                    <Button
                        buttonConfig={{
                            disabled: !formIsValid,
                            alt: "true",
                        }}
                        text="Sign Up"
                    />
                </div>
                <div className={classes["another-actions"]}>
                    Already have an account?
                    <Link to="/login"> Log in →</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;