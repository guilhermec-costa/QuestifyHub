export const checkAuthentication = () => {
    const jwt = localStorage.getItem("token");
    return jwt ? true : false;
};

export const logout = (navigate:any) => {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
    return;
};
