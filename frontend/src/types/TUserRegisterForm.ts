import { z } from "zod";

export const UserRegisterFormValidation = z.object({
    email: z.string().
        email({
            message: "Not a valid email format"
        }),
    password: z.string().
        min(7, { message: "Password too short" }),
    confirmPassword: z.string().
        min(7, { message: "Password too short" })
        .uuid({ message: "NÃO É UUID" })

});

export type TUserRegistration = z.infer<typeof UserRegisterFormValidation>;
