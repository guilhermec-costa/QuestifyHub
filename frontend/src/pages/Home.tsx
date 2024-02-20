import { Component, For, Show, createEffect, onMount} from "solid-js";
import { checkAuthentication } from "../utils/auth";
import { useNavigate } from "@solidjs/router";
import { Telescope } from "lucide-solid";
import HomeProfileMenu from "../components/HomeProfileMenu";
import SearchItem from "../components/SearchItem";
import data from "../data.json";
import { createStore } from "solid-js/store";

const Home: Component = () => {
    const navigator = useNavigate();
    const username = localStorage.getItem("username");
    checkAuthentication(navigator);

    const [searchItems, setSearchItems] = createStore<Object[]>([]);

    onMount(() => {
        setSearchItems(data.items);
    })

    return (
        <div class="bg-[#0D1821] relative">
            <HomeProfileMenu />
            <div class="min-w-4/5 mx-auto flex flex-col justify-center items-center">
                <form method="post" class="w-[40%] mt-[200px] relative">
                    <input type="text"
                       placeholder="Type anything"
                       class="pl-6 py-3 w-full rounded-md text-xl outline-none hover:outline-none border-3 border-[#cccbc8]"/>
                    <Telescope width={48} height={30} class="absolute right-3 bottom-[7px]" color="#344966"/>
                </form>
                <div class="py-12">
                    <Show when={searchItems}>
                        <For each={searchItems}>
                            {(search:any, i) => (
                                <SearchItem
                                    displayLink={search.link}
                                    snippet={search.snippet}
                                    title={search.title}
                                    position={i()}
                                />
                            )}
                        </For>
                    </Show>
                </div>
            </div>
        </div>
    );
};

export default Home;
