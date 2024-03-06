import { Component, JSXElement } from "solid-js";
import { PropsWithChildren } from "../types/TPropsWithChildren";
import { checkAuthentication } from "../utils/auth";
import { Navigate, Navigator, useNavigate } from "@solidjs/router";

const PrivateRoute:Component<PropsWithChildren> = ({children}) => {
    const isAuthorized = checkAuthentication();
    const navigator = useNavigate();
    if(isAuthorized) {
        return (
            <>{children}</>
        )
    }

    navigator("/signin", {replace: true});
}

export default PrivateRoute;
