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
    const jwt = localStorage.getItem("token");
    const [searchItems, setSearchItems] = createStore<Object[]>([]);
    checkAuthentication(navigator);

    let searchRef: HTMLInputElement;

    createEffect(async () => {
        try {
            const response = await axios.get("http://localhost:3333/users/jwt", {
                headers: { Authorization: `Bearer ${jwt}` }
            });
        } catch(err) {
            throw new Error("Error on get user");
        };
    });


    const handleSearch = async (event:Event) => {
        event.preventDefault();
        try {
            const searchResults = await axios.get("http://localhost:3333/search", {
                params: {
                    q: searchRef.value
                }
            });
            const searchData = searchResults.data;
            const { items: searchItems } = searchData;
            setSearchItems(searchItems);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div class="min-h-screen bg-[#0D1821] relative">
            <HomeProfileMenu />
            {/* <img src={logo} alt="" /> */}
            <div class="min-w-4/5 mx-auto flex flex-col justify-center items-center">
                <form method="post" class="w-[40%] mt-[200px] relative flex justify-between items-center" onSubmit={handleSearch}>
                    <input type="text" ref={searchRef}
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
