import { Redirect, Route } from "react-router-dom";
import Header from "./components/Layouts/Header";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "./components/Common/ProtectedRoute";
import Loading from "./components/Loading/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyToken } from "./actions/auth-actions";

const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Tasks = lazy(() => import("./components/Tasks/Tasks"));
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(verifyToken());
    }, [dispatch]);

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
