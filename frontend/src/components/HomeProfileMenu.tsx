import { Component, For, onMount, createSignal, onCleanup, Show } from "solid-js"
import { logout } from "../utils/auth"
import { useNavigate } from "@solidjs/router";
import { CircleUserRound } from "lucide-solid";
import handleOutsideClick from "../utils/onOutsideClick";
import { useUserContext } from "../contexts/userContext";
import profile from "../assets/profile.png";
    import ProfileOption from "./ProfileOption";

interface IMenuOptions {
    [key:string]: any
};

const HomeProfileMenu: Component = () => {
    const navigator = useNavigate();
    const userConfig = useUserContext();
    const menuOptions:IMenuOptions = {
        Profile: () => navigator("/me"),
        Logout: () => logout(navigator)
    };

    const [menuModal, setMenuModal] = createSignal(false);

    let menuIcon: HTMLButtonElement|undefined;
    let menuModalRef: HTMLDivElement|undefined;

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
                    <CircleUserRound color={"#ffffff"} width={36} height={36} strokeWidth={1.2}/>
                </button>
            </div>
            <Show when={menuModal()}>
                <div ref={menuModalRef}
                    class="h-[40%] w-[230px] bg-slate-600 absolute right-8 top-[6%] z-1
                    rounded-md overflow-y-auto">
                    <p class="text-center mt-3">Hi, {userConfig.email}</p>
                    <img src={profile} alt="profile-pic" class="w-[110px] block mx-auto mt-4" />
                    <div class="mt-4 h-[50%] w-full">
                        <ul class="w-full flex flex-col justify-center h-full items-center gap-y-3">
                            <For each={Object.keys(menuOptions)}>
                                {(option) => <ProfileOption name={option} perform={menuOptions[option]}/>}
                            </For>
                        </ul>
                    </div>
                </div>
            </Show>
        </>
    );
};

export default HomeProfileMenu;
