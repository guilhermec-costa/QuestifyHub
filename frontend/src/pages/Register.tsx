import { Component, Setter, createSignal } from "solid-js";
import EntryPointModal from "../components/EntryPointModal";
import { Eye, EyeOff } from "lucide-solid";
import {UserRegisterFormValidation, TUserRegistration} from "../types/TUserRegisterForm";
import { createStore } from "solid-js/store";

type UserRegistrationErrors = {
    [key: string]: string[]
}

const Register: Component = () => {
    const [pwdVisibility, setPwdVisibility] = createSignal(false);
    const [confirmPwdVisibility, setConfirmPwdVisibility] = createSignal(false);
    let passwordField:HTMLInputElement;
    let confirmPasswordField:HTMLInputElement;
    let registerForm: HTMLFormElement;
    let userEmail: HTMLInputElement;

    const [registerFormBody, setRegisterFormBody] = createStore<TUserRegistration>({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [registerFormErrors, setRegisterFormErrors] = createStore<UserRegistrationErrors>({
        email: [],
        password: [],
        confirmPassword: []
    });

    const togglePwdVisibility = (passwordReference:HTMLInputElement, toggleVisibilityCallback:Setter<boolean>) => {
        passwordReference.type = passwordReference.type === "password" ? "text" : "password";
        toggleVisibilityCallback(prevVisibility => !prevVisibility);
    };

    const handleFormOnChange = () => {
        setRegisterFormBody({
            email: userEmail.value,
            password: passwordField.value,
            confirmPassword: confirmPasswordField.value
        });
        discoverErrors();
    };

    const discoverErrors = () => {};

    return (
        <EntryPointModal>
            <div class="w-1/2 bg-[#F0F4EF] rounded-l-xl flex flex-col items-center relative">
                <h2 class="text-xl text-[#2d2d2d] mb-4 mt-12">Get started on <span class="text-[#006fff] font-bold">QuestifyHub</span></h2>
                <form  method="post" ref={registerForm} onChange={handleFormOnChange}
                    class="h-1/2 w-4/5 p-3">
                    <div class="flex flex-col gap-2">
                        <label for="email">Email</label>
                        <input ref={userEmail}
                        class="outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none p-0.5"
                        type="text" name="email" placeholder="Email"/>
                        {/* <span class="text-red-500 text-xs">{loginErrors.email}</span> */}

                        <label for="password" class="mt-2">Password</label>
                        <div class="relative inline-block">
                            <input
                                class="w-[100%] outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none p-0.5"
                                type="password" name="password" ref={passwordField} placeholder="Password" />
                                <button type="button" class="absolute right-2 bottom-[2px] hover:cursor-pointer" onClick={() => togglePwdVisibility(passwordField, setPwdVisibility)}>
                                {pwdVisibility() ? (
                                    <Eye color={"#454545" }width={16} />
                                    ) : (
                                    <EyeOff color={"#454545"} width={16} />
                                    )
                                }
                                </button>
                        </div>

                        <label for="password" class="mt-2">Confirm password</label>
                        <div class="relative inline-block">
                            <input
                                class="w-[100%] outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none p-0.5"
                                type="password" name="password" ref={confirmPasswordField} placeholder="Password" />
                                <button type="button" class="absolute right-2 bottom-[2px] hover:cursor-pointer" onClick={() => togglePwdVisibility(confirmPasswordField, setConfirmPwdVisibility)}>
                                {confirmPwdVisibility() ? (
                                    <Eye color={"#454545" }width={16} />
                                    ) : (
                                    <EyeOff color={"#454545"} width={16} />
                                    )
                                }
                                </button>
                        </div>
                        <input
                        class="hover:cursor-pointer bg-[#2d2d2d] text-[#F0F4EF] p-1 rounded-md mt-3 hover:bg-[#2d2d2de5]"
                        type="submit" value="Register" />
                    </div>
                    <p class="text-[#2d2d2d] text-sm mt-3">Already have an account? <span class="text-[#006fff] font-bold"><a href="/signin">Log In</a></span></p>
                </form>
            </div>
        </EntryPointModal>
    )
}

export default Register;
