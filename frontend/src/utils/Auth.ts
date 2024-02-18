import { useNavigate } from "@solidjs/router";

class Auth {
    private navigate = useNavigate();

    public isAuthenticated() {
        const jwt = localStorage.getItem("token");
        
        if(!jwt) {
            this.navigate("/signin", {replace: true});
        };

       return;
    }

    public logout() {
        localStorage.removeItem("token");
        this.navigate("/signin");
    };
};

export default new Auth();
