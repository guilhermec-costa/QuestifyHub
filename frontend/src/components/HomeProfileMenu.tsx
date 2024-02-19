import { Show, Component, onMount } from "solid-js"

interface IHomeProfileMenu {
    domReference: HTMLDivElement|undefined;
};

const HomeProfileMenu: Component = (props:any) => {
    return (
        <div ref={props.ref}
            class="h-[200px] w-[130px] bg-[#f5f4f1] absolute right-5 top-2 z-1
            rounded-md p-7">
            Simple div
        </div>
    );
};

export default HomeProfileMenu;
