import { Component, createSignal } from "solid-js";

const Login: Component = () => {
    let loginForm:HTMLFormElement;

    const handleFormSubmition = (e:Event) => {
        e.preventDefault();
        const formFields:string[] = ["email", "password"];

        let loginBody = formFields.reduce((acc, field) => {
            acc[field] = (loginForm.elements.namedItem(field) as HTMLInputElement).value;
            return acc;
            }, {} as Record<string, string>)
        console.log(loginBody);
    };

    return (
        <div class="bg-[#FFC107] w-full h-screen flex justify-center items-center">
            <div class="w-3/5 flex h-3/5">
                <div class="w-1/2 bg-[#F5F5F5] rounded-l-lg">
                    <h3>Get started on Questify</h3>
                    <form ref={loginForm}
                        class="h-1/2 w-1/2 p-3 border-black mx-auto my-[25%]"
                        onSubmit={handleFormSubmition}>
                        <div class="flex flex-col gap-2">
                            <input  type="email" name="email" placeholder="Email"/>
                            <input type="password" name="password" placeholder="Password" />
                            <input type="submit" value="Login" class="hover:cursor-pointer"/>
                        </div>
                    </form>

                </div>
                <div class="bg-[#333333] w-1/2 rounded-r-lg">Aqui</div>
            </div>
        </div>
    );
};

export default Login;
