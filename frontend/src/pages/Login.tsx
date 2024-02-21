import { Component, createSignal } from "solid-js";
import {createStore} from "solid-js/store";
import axios, { AxiosError } from "axios";
import { Navigate, useNavigate } from "@solidjs/router";
import { ZodError } from "zod";
import {Eye, EyeOff} from "lucide-solid";
import EntryPointModal from "../components/EntryPointModal";

const Login: Component = () => {
    let loginForm:HTMLFormElement;
    let passwordField:HTMLInputElement;
    const navigate = useNavigate();

    const [pwdVisibility, setPwdVisibility] = createSignal(false);
    const [loginErrors, setLoginErrors] = createStore({
        email: "",
        password: "",
        name: ""
    });

    const handleFormSubmition = async (e:Event) => {
        e.preventDefault();
        const formFields:string[] = ["email", "password"];

        const loginBody = formFields.reduce((acc, field) => {
            acc[field] = (loginForm.elements.namedItem(field) as HTMLInputElement).value;
            return acc;
            }, {} as Record<string, string>);

        try {
            const { data: { token, user } } = await axios.post("http://localhost:3333/auth/login", loginBody);
            localStorage.setItem("token", token);
            localStorage.setItem("username", user.displayName);
            navigate("/home");
            } catch(err) {
            if(err instanceof AxiosError) {
                const errorData = err.response?.data;
                if(Object.keys(errorData).includes("name") && errorData.name === "ZodError") {
                    const zodErrors = (errorData as ZodError).issues.reduce((acc, error) => {
                        acc[error.path[0]] = error.message;
                        return acc;
                     }, {} as Record<string, string>);
                    for(const key of Object.keys(loginErrors)) {
                        setLoginErrors((prevErrors) => {
                            return {
                                ...prevErrors,
                                [key]: Object.keys(zodErrors).includes(key) ? zodErrors[key]: ""
                            };
                        });
                    };
                } else {
                    setLoginErrors(errorData);
                }
            }
        };
    };

    const togglePwdVisibility = () => {
        passwordField.type = passwordField.type === "password" ? "text" : "password";
        setPwdVisibility(prevVisibility => !prevVisibility);
    }

    return (
        <EntryPointModal>
            <div class="w-1/2 bg-[#F0F4EF] rounded-l-xl flex flex-col justify-center items-center">
                <h2 class="text-xl text-[#2d2d2d] mb-4">Get started on <span class="text-[#006fff] font-bold">QuestifyHub</span></h2>
                <form ref={loginForm} method="post" action="http://localhost:3000/rotateste"
                    class="h-1/2 w-4/5 p-3"
                    onSubmit={handleFormSubmition}>
                    <div class="flex flex-col gap-2">
                        <label for="email">Email</label>
                        <input
                        class="outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none p-0.5"
                        type="text" name="email" placeholder="Email"/>
                        <span class="text-red-500 text-xs">{loginErrors.email}</span>

                        <label for="password" class="mt-2">Password</label>
                        <div class="relative inline-block">
                            <input
                                class="w-[100%] outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none p-0.5"
                                type="password" name="password" ref={passwordField} placeholder="Password" />
                                <button type="button" class="absolute right-2 bottom-[2px] hover:cursor-pointer" onClick={togglePwdVisibility}>
                                {pwdVisibility() ? (
                                    <Eye color={"#454545" }width={16} />
                                    ) : (
                                    <EyeOff color={"#454545"} width={16} />
                                    )
                                }
                                </button>
                        </div>
                        <span class="text-red-500 text-xs">{loginErrors.password}</span>

                        <input
                        class="hover:cursor-pointer bg-[#2d2d2d] text-[#F0F4EF] p-1 rounded-md mt-3 hover:bg-[#2d2d2de5]"
                        type="submit" value="Login" />
                    </div>
                    <p class="text-[#2d2d2d] text-sm mt-3">Already have an account? <span class="text-[#006fff] font-bold"><a href="">Log In</a></span></p>
                </form>
            </div>
        </EntryPointModal>
    );
};

export default Login;
