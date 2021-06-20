import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth-actions";
const Header = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };
    return (
        <header className={classes.header}>
            <h2>ReduxTodo</h2>

            <ul>
                {isAuthenticated && (
                    <>
                        <li>
                            <NavLink
                                to="/todo"
                                activeClassName={classes.active}
                            >
                                My Todo
                            </NavLink>
                        </li>
                        <li onClick={logoutHandler}>Log out</li>
                    </>
                )}

                {!isAuthenticated && (
                    <>
                        <li>
                            <NavLink
                                to="/login"
                                activeClassName={classes.active}
                            >
                                Sign In
                            </NavLink>
                        </li>
                        <li className={classes.register}>
                            <NavLink
                                to="/register"
                                activeClassName={classes.active}
                            >
                                Sign Up
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

export default Header;
