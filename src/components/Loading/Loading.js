import classes from "./Loading.module.css";
const Loading = () => {
    return (
        <div className={classes.loading}>
            <span className={classes.line}></span>
        </div>
    );
};
export default Loading;
