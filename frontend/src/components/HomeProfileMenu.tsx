import { Component, For } from "solid-js"
import { logout } from "../utils/RoutesGuardian"
import { useNavigate } from "@solidjs/router";

interface IMenuOptions {
    [key:string]: any
}

const HomeProfileMenu: Component = (props:any) => {
    const navigator = useNavigate();
    const menuOptions:IMenuOptions = {
        Profile: () => console.log("profile"),
        Logout: () => logout(navigator)
    };

    return (
        <div
            ref={props.ref}
            class="h-[200px] w-[130px] bg-[#b6ccd8] absolute right-5 top-2 z-1
            rounded-md p-7">
            <ul>
                <For each={Object.keys(menuOptions)}>
                    {(item) => {
                        return (
                            <button onClick={menuOptions[item]} class="hover:cursor-pointer">{item}</button>
                        )
                    }}
                </For>
            </ul>
        </div>
    );
};

export default HomeProfileMenu;
