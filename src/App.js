import { Redirect, Route } from "react-router-dom";
import Header from "./components/Layouts/Header";
import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "./reducers/task";
import { ProtectedRoute } from "./components/Common/ProtectedRoute";
import Loading from "./components/Loading/Loading";

const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Tasks = lazy(() => import("./components/Tasks/Tasks"));
function App() {
    const currentTasks = useSelector((state) => state.tasks.currentTasks);
    const completedTasks = useSelector((state) => state.tasks.completedTasks);
    const dispatch = useDispatch();
    useEffect(() => {
        const tasks = localStorage.getItem("tasks");
        const completedTasks = localStorage.getItem("completed-tasks");

        if (tasks) {
            dispatch(tasksActions.replaceTasks(JSON.parse(tasks)));
        }
        if (completedTasks) {
            dispatch(
                tasksActions.replaceCompletedTasks(JSON.parse(completedTasks))
            );
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(currentTasks));
        localStorage.setItem("completed-tasks", JSON.stringify(completedTasks));
    }, [currentTasks, completedTasks]);

    return (
        <Suspense fallback={<Loading />}>
            <div className="App">
                <Header />
                <main>
                    <Route path="/" exact>
                        <Redirect to="/todo" />
                    </Route>
                    <ProtectedRoute path="/todo" exact component={Tasks} />
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </main>
            </div>
        </Suspense>
    );
}

export default App;
