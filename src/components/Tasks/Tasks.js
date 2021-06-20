import classes from "./Tasks.module.css";
import { useInput } from "./../../hooks/use-input";
import { isEmpty } from "./../../helpers/index";
import TaskItem from "./TaskItem/TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "./../../reducers/task";
import TaskEditModal from "./TaskEditModal/TaskEditModal";
import { useState } from "react";
import { addTask, getTasks } from "../../actions/task-actions";
import { useEffect } from "react";
const Tasks = (props) => {
    const tasks = useSelector((state) => state.tasks.notCompletedTasks);
    const completedTasks = useSelector((state) => state.tasks.completedTasks);
    const isShownModal = useSelector((state) => state.tasks.isShownModal);
    const isFetchingData = useSelector((state) => state.tasks.isFetchingData);
    const [taskEdit, setTaskEdit] = useState({
        id: null,
        title: null,
    });
    const dispatch = useDispatch();

    const {
        value: enteredTask,
        isValid: enteredTaskIsValid,
        hasError,
        valueInputBlurHandler: taskBlurHandler,
        valueInputChangeHandler: taskChangeHandler,
        inputResetHandler: taskReset,
    } = useInput(isEmpty);

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (!enteredTaskIsValid) {
            return;
        }
        dispatch(addTask(enteredTask));

        taskReset();
    };

    const showEditModalHandler = ({ id, title }) => {
        setTaskEdit((prevState) => {
            return {
                id: id,
                title: title,
            };
        });
        dispatch(tasksActions.showModal());
    };

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    const closeEditModalHandler = () => {
        dispatch(tasksActions.closeModal());
    };

    const taskInputClasess = `${classes["tasks-input"]} ${
        hasError ? classes.invalid : ""
    }`;

    const tasksList = tasks.length
        ? tasks.map((task) => (
              <TaskItem
                  key={task.taskId}
                  id={task.taskId}
                  title={task.title}
                  isDone={task.isDone}
                  onShowEditModal={showEditModalHandler}
              />
          ))
        : !completedTasks.length && (
              <p className={classes["no-task"]}>
                  You don't have any task to do
              </p>
          );
    const completedList = completedTasks.length ? (
        <div className={classes.completed}>
            <h3>COMPLETED</h3>
            {completedTasks.map((task, index) => (
                <TaskItem
                    key={index}
                    id={task.taskId}
                    title={task.title}
                    isDone={task.isDone}
                    onShowEditModal={showEditModalHandler}
                />
            ))}
        </div>
    ) : (
        <></>
    );

    return (
        <>
            {isShownModal && (
                <TaskEditModal
                    id={taskEdit.id}
                    title={taskEdit.title}
                    onCloseEditModal={closeEditModalHandler}
                />
            )}

            <div className={classes.tasks}>
                <div className={classes.container}>
                    <form onSubmit={formSubmitHandler}>
                        <input
                            className={taskInputClasess}
                            type="text"
                            value={enteredTask}
                            onBlur={taskBlurHandler}
                            onChange={taskChangeHandler}
                        />
                        <small className={classes["text-helper"]}>
                            Add task
                        </small>
                    </form>
                    <div className={classes["tasks-list"]}>
                        {isFetchingData ? (
                            <p className={classes["loading-data"]}>
                                Loading Data...
                            </p>
                        ) : (
                            <>
                                <div className={classes["not-completed"]}>
                                    <ul>{tasksList}</ul>
                                </div>
                                {completedList}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tasks;
