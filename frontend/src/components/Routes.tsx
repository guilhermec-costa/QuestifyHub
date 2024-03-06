import { Router, Route, useNavigate} from "@solidjs/router";
import { UserContext, UserContextProvider } from "../contexts/userContext";
import PrivateRoute from "./PrivateRoute";
import { Component, lazy } from "solid-js";

const Login = lazy(() => import("../pages/Login"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));

const Routes:Component = () => {
    return (
        <UserContextProvider>
            <Router>
                <Route path={["/signin", "/"]} component={Login} />   
                <Route path="/register" component={Register} />
                <PrivateRoute>
                    <Route path="/home" component={Home} />
                </PrivateRoute>
                <Route path="/me" component={Profile} />
                <Route path="*" component={NotFound} />
            </Router>
        </UserContextProvider>
    );
};

export default Routes;
