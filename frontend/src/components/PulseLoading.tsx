import { Component } from "solid-js";

const PulseLoading: Component = () => {
    return (
        <div class="bg-[#122331] p-5 border border-slate-700 animate-pulse mx-auto flex flex-col items-start">
            <div class="w-1/4 h-5 bg-slate-700 rounded-md"></div>
            <div class="w-3/4 h-3 bg-slate-700 rounded-md mt-4 ml-7"></div>
        </div>
    );
};

export default PulseLoading;
