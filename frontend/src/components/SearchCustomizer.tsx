import { createStore } from "solid-js/store";
import { Accessor, Setter, createSignal } from "solid-js";
import { Signal } from "solid-js";
import {PlusIcon} from "lucide-solid";

interface ICustomSearch {
    dateRange: Date[]
    excludeTerms: string[]
    includeTerms: string[]
    items: () => string
}

const SearchCustomizer = () => {
    const [termsToInclude, setTermsToInclude] = createSignal<string[]>([]);
    const [searchConfiguration, setSearchConfiguration] = createStore<ICustomSearch>({
        includeTerms: [],
        excludeTerms: [],
        dateRange: [new Date(), new Date()],
        get items() {
            return `Olá`
        }
    });

    let wordToIncludeRef: HTMLInputElement|undefined;
    const [wordToInclude, setWordToInclude] = createSignal<string>("");

    const addWordToIncludeTerms = () => {
        setSearchConfiguration("includeTerms", (prevTerms) => [...prevTerms, wordToIncludeRef?.value as string]);
        if(wordToIncludeRef?.value) wordToIncludeRef.value = "";
        console.log()
    }

    return (
        <form class="flex flex-wrap items-start justify-center gap-x-5 mt-3">
            <div class="w-[42%] my-2">
                <label for="search-range" class="text-[#ffffff]">Date range</label>
                <input type="date" name="search-engine" class="p-1 bg-[#F0F4EF] w-full rounded-sm mt-1 outline-none pl-3"/>
            </div>
            <div class="w-[42%] my-2">
                <label for="search-range" class="text-[#ffffff]">Must contain</label>
                <div class="relative">
                    <input type="text" name="search-engine" class="p-1 bg-[#F0F4EF] w-full rounded-sm mt-1 outline-none pl-3" placeholder="Terms to include" ref={wordToIncludeRef}
                    onInput={() => setWordToInclude(wordToIncludeRef?.value as string)} />
                    {
                        wordToInclude().length > 0 &&
                        <PlusIcon class="absolute right-2 bottom-1 cursor-pointer" color="#e9aa2b" width={24} strokeWidth={2.4}
                            onClick={addWordToIncludeTerms}
                        />
                    }
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
