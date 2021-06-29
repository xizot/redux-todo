import { useInput } from "./../../hooks/use-input";
import Input from "./../../components/UI/Input";
import classes from "../Login/Login.module.css";
import registerClasses from "./Register.module.css";
import Button from "../../components/UI/Button";
import { isGreaterThreeCharacters, isEmpty } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { authActions } from "../../reducers/auth";
import { useEffect } from "react";
import { register } from "../../actions/auth-actions";
const Register = (props) => {
    const {
        value: nameEntered,
        hasError: nameHasError,
        isValid: nameIsValid,
        valueInputBlurHandler: nameBlurHandler,
        valueInputChangeHandler: nameChangeHandler,
    } = useInput(isEmpty);
    const {
        value: usernameEntered,
        hasError: usernameHasError,
        isValid: usernameIsValid,
        valueInputBlurHandler: usernameBlurHandler,
        valueInputChangeHandler: usernameChangeHandler,
    } = useInput(isGreaterThreeCharacters);

    const {
        value: passwordEntered,
        hasError: passwordHasError,
        isValid: passwordIsValid,
        valueInputBlurHandler: passwordBlurHandler,
        valueInputChangeHandler: passwordChangeHandler,
    } = useInput(isEmpty);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const errorResponse = useSelector((state) => state.auth.errorResponse);
    const isRequesting = useSelector((state) => state.auth.isRequesting);
    const successMsg = useSelector(
        (state) => state.auth.registerSuccessMessage
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.resetError());
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
            register({
                fullname: nameEntered,
                username: usernameEntered,
                password: passwordEntered,
            })
        );
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
                {errorResponse && (
                    <p className={classes["login-failed"]}>{errorResponse}</p>
                )}
                {successMsg && (
                    <p className={classes["register-succeeded"]}>
                        {successMsg}
                    </p>
                )}
                <div className="form-actions">
                    <Button
                        buttonConfig={{
                            disabled: !formIsValid,
                            alt: "true",
                        }}
                        text={isRequesting ? "Signing up..." : "Sign up"}
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
