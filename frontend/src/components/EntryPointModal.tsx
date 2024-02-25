import { Component, JSXElement } from "solid-js";
import pic from "../assets/texture.jpg"
import "./style.css"

interface IEntryPointModal {
    children: JSXElement
};

const EntryPointModal: Component<IEntryPointModal> = ({children}) => {
    return(
        <div class="bg-[#0D1821] w-full h-screen flex justify-center items-center">
            <div class="w-1/2 flex h-[55%] mx-auto rounded-xl min-w-[350px] " id="entry-modal">
                {children}
                <div class="w-1/2 rounded-r-xl max-[768px]:hidden relative flex flex-col justify-center items-center">
                    <img src={pic} alt="" class="h-full w-full absolute z-1 rounded-r-xl"/>
                    <h2 class="text-xl text-wrap text-center relative z-2 text-[#0D1821] p-4 drop-shadow-lg">
                    Embark on an enlightening journey, where <span class="text-[#066fff] font-bold">AI</span> meets human curiosity, expanding your <span class="font-bold">knowledge</span> in innovative and unprecedented ways.
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default EntryPointModal;
