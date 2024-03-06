import { Component } from "solid-js";
import { useUserContext } from "../contexts/userContext";

const Profile:Component = () => {
    const userConfig = useUserContext();

    return (
        <div class="min-h-screen bg-[#0D1821] relative">{userConfig.email}</div>
    );
};

export default Profile;
