import { createSignal } from "solid-js"
const delay = async (ms: number = 500) => {
        createSignal(true)
        await new Promise(resolve => setTimeout(resolve, ms))
            .catch(err => console.error(err))
        createSignal(false)
};
