import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

const NotFound: Component = () => {
    const [timeToRedirect, setTimeToRedirect] = createSignal(10);
    const navigator = useNavigate();

    setInterval(() => {
        setTimeToRedirect(prevTime => --prevTime)
        if(timeToRedirect() === 0) {
            navigator("/", {state});
        };
    }, 1000);


    return (
        <div class="bg-[#0D1821] w-full h-screen">
            <div class="flex flex-col items-center">
                <h2 class="text-[#B4CDED] text-4xl w-fit font-bold mt-4 tracking-wide">
                    Sorry, there is nothing here :(
                </h2>
                <h3 class="text-[#ffffff] w-fit font-bold">Redirecting in {timeToRedirect()}</h3>
            </div>
        </div>
    );
};

export default NotFound;
