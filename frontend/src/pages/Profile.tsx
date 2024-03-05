import { useLocation, useParams } from "@solidjs/router";
import { Component } from "solid-js";
import { useUserContext } from "../contexts/userContext";

const Profile:Component = () => {
    const user = useUserContext();
    console.log(user);
    const data = useLocation();
    console.log(data);
    return (
        <h1>PROFILE PAGE</h1>
    );
};

export default Profile;
