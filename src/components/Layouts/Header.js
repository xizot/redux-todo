import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
const Header = (props) => {
    return (
        <header className={classes.header}>
            <h2>ReduxTodo</h2>

            <ul>
                <li>
                    <NavLink to="/todo" activeClassName={classes.active}>
                        My Todo
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" activeClassName={classes.active}>
                        Sign In
                    </NavLink>
                </li>
                <li className={classes.register}>
                    <NavLink to="/register" activeClassName={classes.active}>
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;
