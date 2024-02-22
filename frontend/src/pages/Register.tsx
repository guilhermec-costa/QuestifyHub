import { Component, Setter, createSignal, For, ErrorBoundary } from "solid-js";
import EntryPointModal from "../components/EntryPointModal";
import { Eye, EyeOff } from "lucide-solid";
import {UserRegisterFormValidation, TUserRegistration} from "../types/TUserRegisterForm";
import { createStore } from "solid-js/store";
import { ZodError, z } from "zod";

const Register: Component = () => {
    const [pwdVisibility, setPwdVisibility] = createSignal(false);
    const [confirmPwdVisibility, setConfirmPwdVisibility] = createSignal(false);
    let passwordField:HTMLInputElement;
    let confirmPasswordField:HTMLInputElement;
    let registerForm: HTMLFormElement;
    let userEmail: HTMLInputElement;

    const [userEmailErrors, setUserEmailErrors] = createSignal<string[]>([]);
    const [passwordErrors, setPasswordErrors] = createSignal<string[]>([]);
    const [confirmationPasswordErrors, setConfirmationPasswordErrors] = createSignal<string[]>([]);

    const [registerFormBody, setRegisterFormBody] = createStore<TUserRegistration>({
        email: "",
        password: "",
        confirmPassword: ""
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

    const handleEmailErrors = () => {
        const emailValidator = z.object({
            email: z.string().email({ message: "Not a valid email format"})
        });

        const result = emailValidator.safeParse({email: userEmail.value});
        if(!result.success) {
            let validationErrors: string[] = [];
            if(userEmail.value) {
            for(const error of result.error.issues) {
                validationErrors.push(error.message);
                };
            };
            setUserEmailErrors(validationErrors);
        }
    }

    const handlePasswordErrors = () => {
        const passwordValidator = z.object({
            password: z.string().min(7, { message: "Password too short"})
        });

        const result = passwordValidator.safeParse({password: passwordField.value});
        if(!result.success) {
            let validationErrors: string[] = [];
            if(passwordField.value) {
            for(const error of result.error.issues) {
                validationErrors.push(error.message);
                };
            };
            setPasswordErrors(validationErrors);
        };
    };

    const handleConfirmationPasswordErrors = () => {
        const confirmPasswordValidator = z.object({
            confirmPassword: z.string().min(7, {message: "Password too short"})
        })

        const result = confirmPasswordValidator.safeParse({confirmPassword: confirmPasswordField.value});
        if(!result.success) {
            let validationErrors: string[] = [];
            if(confirmPasswordField.value) {
            for(const error of result.error.issues) {
                validationErrors.push(error.message);
                };
            };
            setConfirmationPasswordErrors(validationErrors);
        };
    }

    return (
        <EntryPointModal>
            <div class="w-1/2 bg-[#F0F4EF] rounded-l-xl flex flex-col items-center relative">
                <h2 class="text-xl text-[#2d2d2d] mb-4 mt-12">Get started on <span class="text-[#006fff] font-bold">QuestifyHub</span></h2>
                <form  method="post" ref={registerForm}
                    class="h-1/2 w-4/5 p-3">
                    <div class="flex flex-col gap-2">
                        <label for="email">Email</label>
                        <input ref={userEmail} onChange={handleEmailErrors}
                        class="outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none p-0.5"
                        type="text" name="email" placeholder="Email"/>
                        <div class="block">
                            <For each={userEmailErrors()}>
                                {(item) => <span class="text-red-500 text-xs block">{item}</span>}
                            </For>
                        </div>

                        <label for="password">Password</label>
                        <div class="relative">
                            <input onChange={handlePasswordErrors}
                                class="w-[100%] outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none p-0.5"
                                type="password" name="password" ref={passwordField} placeholder="Password" />
                                    <button type="button" class="absolute right-2 bottom-[2px] hover:cursor-pointer" onClick={() => togglePwdVisibility(passwordField, setPwdVisibility)}>
                                {pwdVisibility() ? (
                                    <Eye color={"#454545" } width={16} />
                                    ) : (
                                    <EyeOff color={"#454545"} width={16} />
                                    )
                                }
                                </button>
                        </div>
                        <For each={passwordErrors()}>
                            {(item) => <span class="text-red-500 text-xs block">{item}</span>}
                        </For>

                        <label for="password">Confirm password</label>
                        <div class="relative inline-block">
                            <input onChange={handleConfirmationPasswordErrors}
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
                        <div class="block">
                            <For each={confirmationPasswordErrors()}>
                                {(item) => <span class="text-red-500 text-xs block">{item}</span>}
                            </For>
                        </div>

                        <input
                        class="hover:cursor-pointer bg-[#2d2d2d] text-[#F0F4EF] p-2 rounded-md mt-3 hover:bg-[#2d2d2de5]"
                        type="submit" value="Register" />
                    </div>
                    <p class="text-[#2d2d2d] text-sm mt-3">Already have an account? <span class="text-[#006fff] font-bold"><a href="/signin">Log In</a></span></p>
                </form>
            </div>
        </EntryPointModal>
    )
}

export default Register;
