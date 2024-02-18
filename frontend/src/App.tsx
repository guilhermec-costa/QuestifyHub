import { createSignal, Component, lazy } from 'solid-js';
import { Router, Route } from "@solidjs/router";
import Auth from './pages/Login';

const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App: Component = () => {
    return (
        <Router>
            <Route path="/" component={Login} />   
            <Route path="*404" component={NotFound} />
        </Router>
    )
};

export default App;
