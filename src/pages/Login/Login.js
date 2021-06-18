import LoginForm from "./LoginForm";
import classes from "./Login.module.css";
const Login = (props) => {
    return (
        <div className={classes.login}>
            <LoginForm />
        </div>
    );
};
export default Login;
