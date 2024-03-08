const SearchCustomizer = () => {
    return (
        <div class="flex flex-wrap items-start justify-center gap-x-5 mt-3">
            <div class="w-[42%] my-2">
                <label for="search-range" class="text-[#ffffff]">Date range</label>
                <input type="date" name="search-engine" class="p-1 bg-[#F0F4EF] w-full rounded-sm mt-1 outline-none"/>
            </div>
            <div class="w-[42%] my-2">
                <label for="search-range" class="text-[#ffffff]">Must contain</label>
                <input type="text" name="search-engine" class="p-1 bg-[#F0F4EF] w-full rounded-sm mt-1 outline-none" placeholder="Terms to include"/>
            </div>
            <div class="w-[42%] my-2">
                <label for="search-range" class="text-[#ffffff]">Must not contain</label>
                <input type="text" name="search-engine" class="p-1 bg-[#F0F4EF] w-full rounded-sm mt-1 outline-none" placeholder="Terms to exclude"/>
            </div>
        </div>
    );
};

export default SearchCustomizer;
