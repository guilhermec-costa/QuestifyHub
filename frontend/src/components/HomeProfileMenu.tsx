import { Divide } from "lucide-solid";
import { Show, Component, onMount, For } from "solid-js"

interface IHomeProfileMenu {
    domReference: HTMLDivElement|undefined;
};

interface IMenuOptions {
    [key:string]: any
}

const HomeProfileMenu: Component = (props:any) => {
    const menuOptions:IMenuOptions = {
        Profile: () => console.log("profile"),
        Logout: () => console.log("logout")
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
