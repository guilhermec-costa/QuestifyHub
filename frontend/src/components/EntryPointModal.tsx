import { Component, JSXElement } from "solid-js";

interface IEntryPointModal {
    children: JSXElement
}

const EntryPointModal: Component<IEntryPointModal> = ({children}) => {
    return(
        <div class="bg-[#0D1821] w-full h-screen flex justify-center items-center">
            <div class="w-1/2 flex h-[55%] mx-auto">
                {children}
                <div class="bg-[#B4CDED] w-1/2 rounded-r-xl">
                    <h2>Empower your search capabilities and knowledge</h2>
                </div>
            </div>
        </div>
    )
}

export default EntryPointModal;
