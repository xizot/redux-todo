import { Route } from "react-router-dom";
import Header from "./components/Layouts/Header";
import { lazy, Suspense } from "react";

const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
function App() {
    return (
        <Suspense fallback={<p>Loading ... </p>}>
            <div className="App">
                <Header />
                <main>
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
