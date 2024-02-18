import { Component, lazy } from 'solid-js';
import { Router, Route } from "@solidjs/router";

const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/Home"));

const App: Component = () => {
    return (
        <Router>
            <Route path="/signin" component={Login} />   
            <Route path="/home" component={Home}/>
            <Route path="*" component={NotFound} />
        </Router>
    )
};

export default App;
