import { Component, JSXElement, createEffect, createSignal, onMount } from "solid-js";
import { checkAuthentication } from "../utils/auth";
import { useNavigate } from "@solidjs/router";
import { Menu, Telescope } from "lucide-solid";
import HomeProfileMenu from "../components/HomeProfileMenu";

const Home: Component = () => {
    const navigator = useNavigate();
    const username = localStorage.getItem("username");
    checkAuthentication(navigator);

    return (
        <div class="w-full h-screen bg-[#0D1821] relative">
            <HomeProfileMenu />
            <div class="w-full flex justify-center">
                <form method="post" class="w-2/6 mt-[200px] relative">
                    <input type="text"
                       placeholder="Type anything"
                       class="pl-5 py-2 w-full rounded-md text-xl outline-none hover:outline-none"/>
                    <Telescope width={48} height={30} class="absolute right-3 bottom-[7px]" color="#344966"/>
                </form>
            </div>
        </div>
    );
};

export default Home;
