import { Component } from "solid-js";
import { TSearchProps } from "../types/SearchProps";

const SearchItem: Component<TSearchProps> = ({title, displayLink, snippet, position}) => {
    console.log(displayLink);
    return (
        <div class="py-3">
            <h3 class="text-[#B4CDED] text-xl font-bold"><a href={displayLink} target="_blank">{title}</a></h3>
            <p class="text-[#F0F4EF] text-lg ml-8 py-2">{snippet}</p>
        </div>
    )
}

export default SearchItem;
