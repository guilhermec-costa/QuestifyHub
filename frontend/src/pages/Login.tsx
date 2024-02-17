import { Component, createSignal } from "solid-js";
import axios, { AxiosError } from "axios";

const Login: Component = () => {
    let loginForm:HTMLFormElement;

    const handleFormSubmition = async (e:Event) => {
        e.preventDefault();
        const formFields:string[] = ["email", "password"];

        const loginBody = formFields.reduce((acc, field) => {
            acc[field] = (loginForm.elements.namedItem(field) as HTMLInputElement).value;
            return acc;
            }, {} as Record<string, string>);
        try {
            const { data: { token } } = await axios.post("http://localhost:3333/auth/login", loginBody);
            localStorage.setItem("token", token);
        } catch(err) {
            if(err instanceof AxiosError) {
                console.log(err.response?.data);
            }
            /* console.log(Object.getPrototypeOf(err)); */
            /* console.log(err); */
        };
    };

    return (
        <div class="bg-[#0D1821] w-full h-screen flex justify-center items-center">
            <div class="w-1/2 flex h-[55%] mx-auto">
                <div class="w-1/2 bg-[#F0F4EF] rounded-l-xl flex flex-col justify-center items-center">
                    <h2 class="text-xl text-[#2d2d2d] mb-4">Get started on <span class="text-[#006fff] font-bold">QuestifyHub</span></h2>
                    <form ref={loginForm}
                        class="h-1/2 w-4/5 p-3"
                        onSubmit={handleFormSubmition}>
                        <div class="flex flex-col gap-2">
                            <label for="email">Email</label>
                            <input
                            class="outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none"
                            type="email" name="email" placeholder="Email"/>

                            <label for="password" class="mt-2">Password</label>
                            <input
                            class="outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none"
                            type="password" name="password" placeholder="Password" />

                            <input
                            class="hover:cursor-pointer bg-[#2d2d2d] text-[#F0F4EF] p-1 rounded-md mt-3 hover:bg-[#2d2d2de5]"
                            type="submit" value="Login" />
                        </div>
                    </form>
                </div>
                <div class="bg-[#B4CDED] w-1/2 rounded-r-xl">Aqui</div>
            </div>
        </div>
    );
};

export default Login;
