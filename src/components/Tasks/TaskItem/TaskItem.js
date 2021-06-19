import React from "react";
import classes from "./TaskItem.module.css";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../../reducers/task";

const TaskItem = ({ title, id, isDone, onShowEditModal }) => {
    const dispatch = useDispatch();

    const toggleTaskCompeletedHandler = () => {
        dispatch(tasksActions.toggleCompleted(id));
    };
    const removeTaskHandler = () => {
        dispatch(tasksActions.removeTask(id));
    };
    const showEditModalHandler = () => {
        onShowEditModal({ title, id });
    };
    const itemClasses = `${classes["task-item"]} ${
        isDone ? classes["is-done"] : ""
    }`;

    return (
        <li className={itemClasses}>
            <label
                htmlFor={id}
                className={classes["check-box"]}
                onClick={toggleTaskCompeletedHandler}
            ></label>
            <p>{title}</p>
            <div className={classes.actions}>
                <BiEditAlt
                    className={`${classes.icon} ${classes.edit}`}
                    onClick={showEditModalHandler}
                />
                <BsTrash
                    className={`${classes.icon} ${classes.trash}`}
                    onClick={removeTaskHandler}
                />
            </div>
        </li>
    );
};

export default TaskItem;
