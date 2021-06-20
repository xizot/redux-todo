import { useDispatch } from "react-redux";
import { useState } from "react";
import { isEmpty } from "../../../helpers";
import { useInput } from "../../../hooks/use-input";
import Modal from "./../../UI/Modal";
import classes from "./TaskEditModal.module.css";
import loginFormClasses from "./../Tasks.module.css";
import Button from "../../UI/Button";
import { updateTitle } from "../../../actions/task-actions";
const TaskEditModal = ({ id, title, onCloseEditModal }) => {
    const [isChanged, setIsChanged] = useState(false);
    const {
        value: enteredTaskEdit,
        isValid: enteredTaskEditIsValid,
        hasError: taskEditHasError,
        valueInputBlurHandler: taskEditBlurHandler,
        valueInputChangeHandler: taskEditChangeHandler,
    } = useInput(isEmpty);

    const dispatch = useDispatch();
    const changeTitleHandler = (event) => {
        setIsChanged(true);
        taskEditChangeHandler(event);
    };
    const taskInputClasess = `${loginFormClasses["tasks-input"]} ${
        taskEditHasError ? loginFormClasses.invalid : ""
    }`;
    const formUpdateTaskHandler = (event) => {
        event.preventDefault();
        if (!enteredTaskEditIsValid) {
            return;
        }
        dispatch(
            updateTitle({
                taskId: id,
                title: enteredTaskEdit,
            })
        );
    };
    return (
        <Modal onClose={onCloseEditModal}>
            <form
                onSubmit={formUpdateTaskHandler}
                className={loginFormClasses.form}
            >
                <input
                    className={taskInputClasess}
                    type="text"
                    value={(!isChanged && title) || enteredTaskEdit}
                    onBlur={taskEditBlurHandler}
                    onChange={changeTitleHandler}
                />
                <small className={loginFormClasses["text-helper"]}>
                    Edit task
                </small>
                <div className={classes.actions}>
                    <Button
                        text="Update"
                        buttonConfig={{
                            alt: "true",
                        }}
                    />
                    <Button
                        onClick={onCloseEditModal}
                        text="Cancel"
                        buttonConfig={{
                            type: "button",
                        }}
                    ></Button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskEditModal;
