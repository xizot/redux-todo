import LoginForm from "./LoginForm";
import classes from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../reducers/auth";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";

const Login = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.resetResponse());
    }, [dispatch]);

    if (isAuthenticated) return <Redirect to="/" />;

    const loginHandler = (username, password) => {
        dispatch(authActions.login({ username, password }));
    };

    return (
        <div className={classes.login}>
            <LoginForm onLogin={loginHandler} />
        </div>
    );
};
export default Login;
