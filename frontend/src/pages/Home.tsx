import { Component, For, Show, createEffect, createSignal, createResource, Switch, Match } from "solid-js";
import { checkAuthentication } from "../utils/auth";
import { useNavigate } from "@solidjs/router";
import { Telescope, Eraser, ChevronsUp, ChevronsDown, SlidersHorizontal } from "lucide-solid";
import { api } from "../lib/axios";
import HomeProfileMenu from "../components/HomeProfileMenu";
import SearchItem from "../components/SearchItem";
import data from "../data.json";
import { createStore } from "solid-js/store";
import "./style.css";
import PulseLoading from "../components/PulseLoading";

const Home: Component = () => {
    const navigator = useNavigate();

    const jwt = localStorage.getItem("token");
    const [searchItems, setSearchItems] = createStore<Object[]>([]);
    const [isCustomSearchExpanded, setIsCustomSearchExpanded] = createSignal<boolean>(false);
    const [routesToScrape, setRoutesToScrape] = createSignal<string[]>([]);
    checkAuthentication(navigator);

    let searchRef: HTMLInputElement|undefined;

    const fetchURIsContent = async () => {
        setRoutesToScrape(routesToScrape().length > 0 ? routesToScrape() : []);
        return await api.get("/scrape", {
            params: {
                scrapeOn: routesToScrape()
            }
        });
    };

    const [pagesContent, {mutate, refetch}] = createResource(fetchURIsContent);

    createEffect(async () => {
        try {
            const response = await api.get("/users/jwt", {
                headers: { Authorization: `Bearer ${jwt}` }
            });
        } catch(err) {
            throw new Error("Error on get user");
        };
    });


    const handleSearch = async (event:Event) => {
        event.preventDefault();
        try {
            const searchResponse = await api.get("/search", {
                params: {
                    q: searchRef?.value
                }
            });
            const {items:searchItems} = searchResponse.data;
            let encodedRoutes = searchItems.map(item => encodeURIComponent(item.formattedUrl));
            setRoutesToScrape(encodedRoutes);
            const response = await refetch();
            for(let i=0;i<response?.data.length;++i) {
                /* console.log(JSON.parse(response?.data[i])) */
            }
            setSearchItems(searchItems);
        } catch(err:any) {
            throw new Error(err.message);
        }
    };

    const clearCachedContent = async () => {
        console.log("cleaning");
        try {
            await api.post("/clearCachedContent", {
                documentsId: [...Array(routesToScrape().length).keys()]
            });
        } catch(err) {
            console.log("Error on cleaninn cache");
        }
    }

    return (
        <div class="min-h-screen bg-[#0D1821] relative">
            <HomeProfileMenu />
            <div class="min-w-4/5 mx-auto flex flex-col justify-center items-center">
                <div class="w-[45%]">
                    <form method="post" class="w-full mt-[200px] relative flex justify-between items-center" onSubmit={handleSearch}>
                        <input type="text" ref={searchRef}
                           placeholder="Type anything" class="pl-6 py-3 min-w-full rounded-md text-xl outline-none hover:outline-none border-3 border-[#cccbc8]"/>
                        <Telescope width={48} height={30} class="hover:cursor-pointer absolute right-2 z-20" color="#344966" onClick={handleSearch}/>
                    </form>
                    <div class="w-full relative mx-auto">
                        <div class="mt-[20px] w-[80%] bg-slate-700 rounded-sm inline-block">
                            <label class="cursor-pointer" >
                                <div class="flex justify-between items-center px-2" onClick={() => setIsCustomSearchExpanded(prev => !prev)}>
                                    <h4 class="p-2 text-[#F0F4EF] flex gap-x-3 items-center">Customize your search<SlidersHorizontal width={18}/></h4>
                                    {!isCustomSearchExpanded() ? (
                                        <ChevronsDown color="#ffffff"/>
                                    ) : (
                                        <ChevronsUp color="#ffffff" />
                                    )}
                                </div>
                                <input type="checkbox"/>
                                    <div class="collapsed">
                                    <p class="p-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus vero earum quae numquam vel! Fugiat, molestias quibusdam neque repellendus debitis dolorum. Veniam consectetur tenetur omnis ex cupiditate, ratione libero ullam.</p></div>
                           </label>
                        </div>
                        <button class="text-[#0D1821] bg-[#BFCC94] p-2 rounded-md w-[18%] absolute top-[20px] right-0 flex justify-center items-center gap-x-2" onClick={clearCachedContent}>
                            Clear cache
                            <Eraser width={18} color="#0d1821" strokeWidth={1.6}/>
                        </button>
                    </div>
                </div>
                <div class="mt-10 rounded-lg w-[70%]">
                {
                pagesContent.error ? null :
                pagesContent.loading ?
                <For each={Array(6)}>
                    {(number, i) => (<PulseLoading />)}
                </For>:
                 pagesContent() ? (
                 <>
                    {searchItems.length > 0 && (
                        <h2 class="text-[#ffffff] text-2xl">{searchItems.length} items displayed</h2>
                    )}
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
                 </>
                 ) : null}
                </div>
            </div>
        </div>
    );
};

export default Home;
