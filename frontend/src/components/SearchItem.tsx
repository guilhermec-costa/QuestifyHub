import { Component, createSignal } from "solid-js";
import { TSearchProps } from "../types/SearchProps";
import { BookmarkPlus } from "lucide-solid";

const SearchItem: Component<TSearchProps> = ({title, displayLink, snippet, position, lastPosition}) => {
    const [showBookmark, setShowBookmark] = createSignal<boolean>(false);
    const searchItemBorder = () => {
        if(position===0) {
            return "rounded-t-lg"
        } else if(position===lastPosition-1) {
            return "rounded-b-lg pb-4 mb-[50px]"
        } else {
            return;
        }
    }
    return (
        <div class={`bg-[#182938] border border-[#344966] ${searchItemBorder()} p-3 h-[120px] relative`}
            onMouseOver={() => setShowBookmark(true)} onMouseLeave={() => {
                setShowBookmark(false);
            }}>
            <h3 class="text-[#B4CDED] text-xl font-bold hover:underline decoration-1 decoration-[#B4CDED] flex justify-start items-center">
                <a href={displayLink} target="_blank">
                    {title}
                </a>
                {showBookmark() &&
                    <BookmarkPlus class="cursor-pointer ml-3" color="#e9aa2b"/>
                }
            </h3>
            <p class="text-[#F0F4EF] text-lg ml-8 py-2">{snippet}</p>
        </div>
    )
}

export default SearchItem;
