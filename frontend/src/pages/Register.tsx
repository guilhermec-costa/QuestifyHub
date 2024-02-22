import { Component, Setter, createSignal, For } from "solid-js";
import EntryPointModal from "../components/EntryPointModal";
import { Eye, EyeOff } from "lucide-solid";
import {UserRegisterFormValidation, TUserRegistration} from "../types/TUserRegisterForm";
import { createStore } from "solid-js/store";
import { ZodError, string } from "zod";

type UserRegistrationErrors = {
    email: string[]
    password: string[]
    confirmPassword: string[]
};

enum CurrentError {
    email = "email",
    password = "password"
}

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

    function discoverErrors() {
        try {
            const successValidation = UserRegisterFormValidation.parse(registerFormBody);
        } catch(err) {
            if(err instanceof ZodError) {
                const errorMap: Record<string, string[]> = {};
                for(const error of err.issues) {
                    const path = error.path[0];
                    if (!errorMap[path]) {
                        errorMap[path] = [];
                    }

                    if (!errorMap[path].includes(error.message)) {
                        errorMap[path].push(error.message);
                    };
                    
                }
                const fieldsWithError = Object.keys(errorMap);
                console.log(errorMap);
                setUserEmailErrors(fieldsWithError.includes("email") ? errorMap["email"] : []);
                setPasswordErrors(fieldsWithError.includes("password") ? errorMap["password"] : []);
                setConfirmationPasswordErrors(fieldsWithError.includes("confirmPassword") ? errorMap["confirmPassword"] : []);
            }
        }
    }

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
                        <span class="text-red-500 text-xs">{userEmailErrors()}</span>

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
                                <p>{passwordErrors()}</p>
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
                                <p>{confirmationPasswordErrors()}</p>
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
