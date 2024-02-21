import { Router, Route} from "@solidjs/router";
import { lazy } from "solid-js";

const Login = lazy(() => import("../pages/Login"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));

const Routes = () => {
    return (
        <Router>
            <Route path={["/register", "/"]} component={Register} />   
            <Route path="/signin" component={Login} />
            <Route path="/home" component={Home}/>
            <Route path="*" component={NotFound} />
        </Router>
    );
};

export default Routes;
