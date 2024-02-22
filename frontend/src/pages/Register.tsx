import { Component, Setter, createSignal, For } from "solid-js";
import EntryPointModal from "../components/EntryPointModal";
import { Eye, EyeOff } from "lucide-solid";
import {TUserRegistration} from "../types/TUserRegisterForm";
import { createStore } from "solid-js/store";
import {hasSpecialCharacter} from "../utils/hasSpecialCharacter";
import { z } from "zod";

const Register: Component = () => {
    const [pwdVisibility, setPwdVisibility] = createSignal(false);
    const [confirmPwdVisibility, setConfirmPwdVisibility] = createSignal(false);
    const [userEmailErrors, setUserEmailErrors] = createSignal<string[]>([]);
    const [passwordErrors, setPasswordErrors] = createSignal<string[]>([]);
    const [confirmationPasswordErrors, setConfirmationPasswordErrors] = createSignal<string[]>([]);
    const [allErrors, setAllErrors] = createSignal<[][]>();
    const [hasErrors, setHasErrors] = createSignal<boolean>(false);

    let passwordField:HTMLInputElement;
    let confirmPasswordField:HTMLInputElement;
    let registerForm: HTMLFormElement;
    let userEmail: HTMLInputElement;


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
        const possibleErrors = [userEmailErrors(), passwordErrors(), confirmationPasswordErrors()]
        setAllErrors(possibleErrors as any);
        const doIHaveErrors = allErrors()?.some(error => error.length > 0) as boolean;
        setHasErrors(doIHaveErrors);
    };

    const handleEmailErrors = () => {
        const emailValidator = z.object({
            email: z.string().email({ message: "Not a valid email format"})
        });

        const result = emailValidator.safeParse({email: userEmail.value});
        const validationErrors: string[] = [];
        if(!result.success) {
            if(userEmail.value) {
                for(const error of result.error.issues) validationErrors.push(error.message);
            };
        };
        setUserEmailErrors(validationErrors);
    };

    const handlePasswordErrors = () => {
        const passwordValidator = z.object({
            password: z.string().min(7, { message: "Need at least 7 characters"})
                      .refine(password => hasSpecialCharacter(password),
                      { message: "Must contain a special character" } )
        });

        let validationErrors: string[] = [];
        const result = passwordValidator.safeParse({password: passwordField.value});
        if(!result.success) {
            if(passwordField.value) {
                for(const error of result.error.issues) validationErrors.push(error.message)
            };
        };
        setPasswordErrors(validationErrors);
    };

    const handleConfirmationPasswordErrors = () => {
        const confirmPasswordValidator = z.object({
            confirmPassword: z.string().
                refine((confirmPwd) => confirmPwd === passwordField.value, {message: "Password does not correspond"})
        });

        let validationErrors: string[] = [];
        const result = confirmPasswordValidator.safeParse({confirmPassword: confirmPasswordField.value});
        if(!result.success) {
            if(confirmPasswordField.value) {
            for(const error of result.error.issues) {
                validationErrors.push(error.message);
                };
            };
        };
        setConfirmationPasswordErrors(validationErrors);
    }

    const handleRegisterSubmition = (e:Event) => {
        e.preventDefault();
        const dataToRegister = {
            email: userEmail.value,
            password: passwordField.value
        };
    };


    return (
        <EntryPointModal>
            <div class="w-1/2 bg-[#F0F4EF] rounded-l-xl flex flex-col items-center relative">
                <h2 class="text-xl text-[#2d2d2d] mb-4 mt-16">Get started on <span class="text-[#006fff] font-bold">QuestifyHub</span></h2>
                <form  method="post" ref={registerForm} onChange={handleFormOnChange}
                    class="h-1/2 w-4/5 p-3">
                    <div class="flex flex-col gap-2">
                        <label for="email" class="mt-2">Email</label>
                        <input ref={userEmail} onChange={handleEmailErrors}
                        class="outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none p-0.5"
                        type="text" name="email" placeholder="Email"/>
                        <For each={userEmailErrors()}>
                            {(item) => <span class="text-red-500 text-xs block">{item}</span>}
                        </For>

                        <label for="password" class="mt-2">Password</label>
                        <div class="relative">
                            <input onInput={handlePasswordErrors}
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

                        <label for="password" class="mt-2">Confirm password</label>
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

                        <input disabled={hasErrors()}
                        class={`bg-[#2d2d2d] text-[#F0F4EF] p-2 rounded-md mt-3 hover:bg-[#2d2d2de5] ${userEmailErrors().length > 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
                        type="submit" value="Register" onClick={handleRegisterSubmition} />
                    </div>
                    <p class="text-[#2d2d2d] text-sm mt-3">Already have an account? <span class="text-[#006fff] font-bold"><a href="/signin">Log In</a></span></p>
                </form>
            </div>
        </EntryPointModal>
    )
}

export default Register;
