import { Component } from "solid-js";
import { checkAuthentication, logout } from "../components/RoutesGuardian";
import { useNavigate } from "@solidjs/router";
import axios from "axios";
import { createStore } from "solid-js/store";

const Home: Component = () => {
    const [data, setData] = createStore();
    const navigator = useNavigate();
    checkAuthentication(navigator);

    axios.get("http://localhost:3333/users", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).then(response => console.log(response)).catch(err => console.log(err));
    return (
        <div>
            Home Page
            <button onClick={() => logout(navigator)}>Logout</button>
        </div>
    );
};

export default Home;
