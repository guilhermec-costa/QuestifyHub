import { Component, For, Show, createEffect, onCleanup, onMount} from "solid-js";
import { checkAuthentication } from "../utils/auth";
import { useNavigate } from "@solidjs/router";
import { Telescope } from "lucide-solid";
import HomeProfileMenu from "../components/HomeProfileMenu";
import SearchItem from "../components/SearchItem";
import { ChevronsDown } from "lucide-solid";
import PulseLoading from "../components/PulseLoading";
import data from "../data.json";
import { createStore } from "solid-js/store";
import "./style.css";
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
        /*     const searchResults = await axios.get("http://localhost:3333/search", { */
        /*         params: { */
        /*             q: searchRef.value */
        /*         } */
        /*     }); */
            /* const searchData = data; */
            const { items: searchItems } = data;
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
                       placeholder="Type anything" class="pl-6 py-3 min-w-full rounded-md text-xl outline-none hover:outline-none border-3 border-[#cccbc8]"/>
                    <Telescope width={48} height={30} class="hover:cursor-pointer relative right-12" color="#344966" onClick={handleSearch}/>
                </form>
                <div class="mt-[20px] w-[35%] bg-slate-700 rounded-sm">
                    <label class="cursor-pointer">
                        <div class="flex justify-between items-center px-2">
                            <h4 class="p-2 text-[#F0F4EF]">Customize your search</h4>
                            <ChevronsDown />
                        </div>
                        <input type="checkbox"/>
                            <div class="collapsed">
                            <p class="p-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus vero earum quae numquam vel! Fugiat, molestias quibusdam neque repellendus debitis dolorum. Veniam consectetur tenetur omnis ex cupiditate, ratione libero ullam.</p></div>
                   </label>
                </div>
                <div class="bg-[#182938] mt-10 rounded-lg">
                    {/* <PulseLoading /> */}
                    <Show when={searchItems}>
                        <For each={searchItems}>
                            {(search:any, i) => (
                                    <SearchItem
                                        displayLink={search.link}
                                        snippet={search.snippet}
                                        title={search.title}
                                        position={i()}
                                        lastPosition={searchItems.length}
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
