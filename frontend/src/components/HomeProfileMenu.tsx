import { Component, For, onMount, createSignal, onCleanup, Show } from "solid-js"
import { logout } from "../utils/auth"
import { useNavigate } from "@solidjs/router";
import { Menu } from "lucide-solid";
import handleOutsideClick from "../utils/onOutsideClick";
import { useUserContext } from "../contexts/userContext";

interface IMenuOptions {
    [key:string]: any
};

const HomeProfileMenu: Component = () => {
    const navigator = useNavigate();
    const userConfig = useUserContext();
    const menuOptions:IMenuOptions = {
        Profile: () => navigator("/me", { state: userConfig }),
        Logout: () => logout(navigator)
    };

    const [menuModal, setMenuModal] = createSignal(false);

    let menuIcon: HTMLButtonElement;
    let menuModalRef: HTMLDivElement;

    onMount(() => {
        document.addEventListener("click", e => handleOutsideClick(setMenuModal, e, [menuModalRef, menuIcon]));
    });

    onCleanup(() => {
        document.removeEventListener("click", e => handleOutsideClick(setMenuModal, e, [menuModalRef, menuIcon]));
    });

    const onProfileMenuShow = () => {
        setMenuModal(!menuModal());
    };

    return (
        <>
            <div class="absolute right-6 top-4 z-10">
                <button onClick={onProfileMenuShow} ref={menuIcon}>
                    <Menu color={"#ffffff"} width={30}/>
                </button>
            </div>
            <Show when={menuModal()}>
                <div ref={menuModalRef}
                    class="h-[120px] w-[130px] bg-[#b6ccd8] absolute right-8 top-[3%] z-1
                    rounded-md">
                    <ul class="absolute bottom-1/2">
                        <For each={Object.keys(menuOptions)}>
                            {(item) => {
                                return (
                                    <button onClick={menuOptions[item]}
                                    class="hover:cursor-pointer hover:underline decoration-[#0D1821] block pl-3 text-lg">{item}</button>
                                )
                            }}
                        </For>
                    </ul>
                </div>
            </Show>
        </>
    );
};

export default HomeProfileMenu;
