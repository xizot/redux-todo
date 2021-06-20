import LoginForm from "./LoginForm";
import classes from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/auth-actions";
import { useEffect } from "react";
import { authActions } from "../../reducers/auth";

const Login = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.resetError());
    }, [dispatch]);
    if (isAuthenticated) return <Redirect to="/" />;
    const loginHandler = (username, password) => {
        dispatch(login({ username, password }));
    };

    return (
        <div className={classes.login}>
            <LoginForm onLogin={loginHandler} />
        </div>
    );
};
export default Login;
