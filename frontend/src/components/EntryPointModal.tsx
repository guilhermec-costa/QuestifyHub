import { Component, JSXElement } from "solid-js";
import pic from "../assets/texture.jpg"
import "./style.css"

interface IEntryPointModal {
    children: JSXElement
};

const EntryPointModal: Component<IEntryPointModal> = ({children}) => {
    return(
        <div class="bg-[#0D1821] w-full h-screen flex justify-center items-center overflow-x-scroll">
            <div class="w-1/2 flex h-[55%] mx-auto rounded-xl min-w-[350px] " id="entry-modal">
                {children}
                <div class="w-1/2 rounded-r-xl max-[768px]:hidden relative">
                    <img src={pic} alt="" class="h-full w-full absolute z-1] rounded-r-xl"/>
                    <h2 class="text-xl text-wrap text-[#0D1821] relative z-10">
                    Embark on an enlightening journey powered by QuestifyHub, where AI meets human curiosity, expanding your knowledge in innovative and unprecedented ways.
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default EntryPointModal;
