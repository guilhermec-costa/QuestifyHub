import { Component } from "solid-js";
import EntryPointModal from "../components/EntryPointModal";

const Register: Component = () => {
    return (
        <EntryPointModal>
            <div class="w-1/2 bg-[#F0F4EF] rounded-l-xl flex flex-col justify-center items-center">
                <h2 class="text-xl text-[#2d2d2d] mb-4">Get started on <span class="text-[#006fff] font-bold">QuestifyHubbbbbbb</span></h2>
                <form  method="post"
                    class="h-1/2 w-4/5 p-3">
                    <div class="flex flex-col gap-2">
                        <label for="email">Email</label>
                        <input
                        class="outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none p-0.5"
                        type="text" name="email" placeholder="Email"/>
                        {/* <span class="text-red-500 text-xs">{loginErrors.email}</span> */}

                        <label for="password" class="mt-2">Password</label>
                        <div class="relative inline-block">
                            <input
                                class="w-[100%] outline-none bg-transparent border-b-2 border-[#9e9e9e3b] focus:outline-none p-0.5"
                                type="password" name="password" placeholder="Password" />
                                <button type="button" class="absolute right-2 bottom-[2px] hover:cursor-pointer">
                                {/* {pwdVisibility() ? ( */}
                                {/*     <Eye color={"#454545" }width={16} /> */}
                                {/*     ) : ( */}
                                {/*     <EyeOff color={"#454545"} width={16} /> */}
                                {/*     ) */}
                                {/* } */}
                                </button>
                        </div>
                        {/* <span class="text-red-500 text-xs">{loginErrors.password}</span> */}

                        <input
                        class="hover:cursor-pointer bg-[#2d2d2d] text-[#F0F4EF] p-1 rounded-md mt-3 hover:bg-[#2d2d2de5]"
                        type="submit" value="Login" />
                    </div>
                    <p class="text-[#2d2d2d] text-sm mt-3">Already have an account? <span class="text-[#006fff] font-bold"><a href="/signin">Log In</a></span></p>
                </form>
            </div>
        </EntryPointModal>
    )
}

export default Register;
