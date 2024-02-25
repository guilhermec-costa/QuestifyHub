import { Component, For, Show, createEffect, onCleanup, onMount} from "solid-js";
import { checkAuthentication } from "../utils/auth";
import { useNavigate } from "@solidjs/router";
import { Telescope } from "lucide-solid";
import HomeProfileMenu from "../components/HomeProfileMenu";
import SearchItem from "../components/SearchItem";
import data from "../data.json";
import { createStore } from "solid-js/store";
import axios from "axios";

const Home: Component = () => {
    const navigator = useNavigate();
    const username = localStorage.getItem("username");
    const [searchItems, setSearchItems] = createStore<Object[]>([]);
    const userId = localStorage.getItem("token");

    createEffect(async () => {
        try {
            const response = await axios.get("http://localhost:3333/users/jwt");
            console.log(response.data);
        } catch(err) {
            console.log("erro");
            console.log(err);
        };
    });

    checkAuthentication(navigator);
    onMount(() => document.addEventListener("keydown", handleSearch));
    onCleanup(() => document.removeEventListener("keydown", handleSearch));

    const handleSearch = (event:Event) => {
        const {items} = data;
        switch(event.type) {
            case "keydown": {
                const { key } = (event as KeyboardEvent);
                if(key==="Enter") setSearchItems(items);
                break;
            };

            case "click": {
                setSearchItems(items);
                break;
            };
        };
    };

    return (
        <div class="min-h-screen bg-[#0D1821] relative">
            <HomeProfileMenu />
            {/* <img src={logo} alt="" /> */}
            <div class="min-w-4/5 mx-auto flex flex-col justify-center items-center">
                <form method="post" class="w-[40%] mt-[200px] relative flex justify-between items-center">
                    <input type="text"
                       placeholder="Type anything" class="pl-6 py-3 w-full rounded-md text-xl outline-none hover:outline-none border-3 border-[#cccbc8]"/>
                    <Telescope width={48} height={30} class="hover:cursor-pointer relative right-12" color="#344966" onClick={handleSearch}/>
                </form>
                <button class="w-[15%] text-[#ffffff] font-bold bg-[#6c35de] py-2 px-4 rounded-md mt-4 hover:bg-[#a364ff]">Customize your search</button>
                <div class="bg-[#182938] mt-10">
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
