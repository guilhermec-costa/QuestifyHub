import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

const checkAuthentication = () => {
    const navigate = useNavigate();
    const jwt = localStorage.getItem("token");
    
    if(!jwt) {
        navigate("/signin", {replace: true});
        return;
    };

    return;
};

export default checkAuthentication;
