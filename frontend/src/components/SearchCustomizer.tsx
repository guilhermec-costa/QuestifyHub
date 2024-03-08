import { createStore } from "solid-js/store";
import { Plus } from "lucide-solid";
import { createSignal } from "solid-js";

interface ICustomSearch {
    dateRange: Date[],
    excludeTerms: string[],
    includeTerms: string[]
}

const SearchCustomizer = () => {
    const [customSearch, setCustomSearch] = createStore<ICustomSearch>({} as ICustomSearch)
    let customizations:HTMLFormElement|undefined;
    const [mustContain, setMustContain] = createSignal<string>("");
    let mustContainRef: HTMLInputElement|undefined;

    return (
        <form class="flex flex-wrap items-start justify-center gap-x-5 mt-3" ref={customizations}>
            <div class="w-[42%] my-2">
                <label for="search-range" class="text-[#ffffff]">Date range</label>
                <input type="date" name="search-engine" class="p-1 bg-[#F0F4EF] w-full rounded-sm mt-1 outline-none pl-3"/>
            </div>
            <div class="w-[42%] my-2">
                <label for="search-range" class="text-[#ffffff]">Must contain</label>
                <div class="relative">
                    <input type="text" name="search-engine" class="p-1 bg-[#F0F4EF] w-full rounded-sm mt-1 outline-none pl-3" placeholder="Terms to include" ref={mustContainRef}
                    onInput={() => {
                        setMustContain(mustContainRef?.value as string);
                    }}/>
                    {mustContain().length > 0 && <Plus class="absolute right-2 bottom-1 cursor-pointer" color="#e9aa2b" width={24} strokeWidth={2.4}/>}
                </div>
            </div>
            <div class="w-[42%] my-2">
                <label for="search-range" class="text-[#ffffff]">Must not contain</label>
                <input type="text" name="search-engine" class="p-1 bg-[#F0F4EF] w-full rounded-sm mt-1 outline-none pl-3" placeholder="Terms to exclude"/>
            </div>
        </form>
    );
};

export default SearchCustomizer;
