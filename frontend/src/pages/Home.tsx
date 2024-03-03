import { Component, For, createEffect, createSignal, createResource, Switch, Match } from "solid-js";
import { checkAuthentication } from "../utils/auth";
import { useNavigate } from "@solidjs/router";
import { Telescope, Eraser, ChevronsUp, ChevronsDown, SlidersHorizontal, Loader } from "lucide-solid";
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
    const [firstRender, setFirstRender] = createSignal<boolean>(true);
    const [cleaningCacheState, setCleaningCacheState] = createSignal<boolean>(false);
    checkAuthentication(navigator);

    let searchRef: HTMLInputElement|undefined;
    let collapsibleContainer: HTMLDivElement|undefined;

    const fetchURIsContent = async () => {
        setRoutesToScrape(routesToScrape().length > 0 ? routesToScrape() : []);
        if(firstRender()) {
            setFirstRender(false);
            return;
        }
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
            /* const searchResponse = await api.get("/search", { */
            /*     params: { */
            /*         q: searchRef?.value */
            /*     } */
            /* }); */
            const {items:searchItems} = data;
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
        try {
            setCleaningCacheState(true)
            await api.post("/clearCachedContent", {
                documentsId: [...Array(routesToScrape().length).keys()]
            }).then(() => setCleaningCacheState(false));
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
                        {/* <div class="mt-[20px] w-[80%] bg-slate-600 rounded-sm inline-block"> */}
                        {/*     <label> */}
                        {/*         <div class="flex justify-between items-center px-2 bg-slate-700 rounded-sm hover:bg-slate-500"> */}
                        {/*             <h4 class="p-2 text-[#F0F4EF] flex gap-x-3 items-center cursor-pointer w-full" */}
                        {/*             onClick={(e:Event) =>{ */}
                        {/*                 e.stopPropagation(); */}
                        {/*                 setIsCustomSearchExpanded(prev => !prev)} */}
                        {/*             }> */}
                        {/*                 Customize your search<SlidersHorizontal width={18} /></h4> */}
                        {/*             {!isCustomSearchExpanded() ? ( */}
                        {/*                 <ChevronsDown color="#ffffff" class="cursor-pointer"/> */}
                        {/*             ) : ( */}
                        {/*                 <ChevronsUp color="#ffffff" class="cursor-pointer"/> */}
                        {/*             )} */}
                        {/*         </div> */}
                        {/*         <input type="checkbox"/> */}
                        {/*             <div class="collapsed"> */}
                        {/*             <p class="p-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus vero earum quae numquam vel! Fugiat, molestias quibusdam neque repellendus debitis dolorum. Veniam consectetur tenetur omnis ex cupiditate, ratione libero ullam.</p></div> */}
                        {/*    </label> */}
                        {/* </div> */}
                        <div class="w-4/5 mt-[20px] rounded-sm inline-block">
                           <button class="p-2 cursor-pointer bg-slate-600 w-full rounded-t-sm" onClick={() => setIsCustomSearchExpanded(prev => !prev)}>Collapsible</button>
                               <div class={`${isCustomSearchExpanded() ? "h-[200px] overflow-auto" : "h-[0px] overflow-hidden"} content bg-slate-500 w-full`}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae esse alias maiores repellat officiis praesentium omnis, quos aliquam earum porro eveniet velit ullam aut mollitia accusamus assumenda cum veritatis delectus?</p>
                               </div>
                        </div>
                        <button class="text-[#0D1821] bg-[#BFCC94] p-2 rounded-md w-[18%] absolute top-[20px] right-0 flex justify-center items-center gap-x-2 hover:bg-[#BFCC99]" onClick={clearCachedContent}>
                            {cleaningCacheState() && (
                              <Loader class="animate-spin" width={16}/>  
                            )}
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
