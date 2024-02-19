import { useNavigate } from "@solidjs/router";

export const checkAuthentication = (navigate:any) => {
    const jwt = localStorage.getItem("token");
    
    if(!jwt) {
        navigate("/signin", {replace: true});
    };
    return;
};

export const logout = (navigate:any) => {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
    return;
};
