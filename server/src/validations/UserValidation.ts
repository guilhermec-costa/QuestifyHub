import { z } from "zod";

export const UserSchemaValidation = z.object({
    fullname: z.string({required_error: "Required field"})
            .min(3),
    displayName: z.string()
            .min(3),
    password: z.string({ required_error: "Required required" })
            .min(7, "Password should be at least 7 characters"),
    email: z.string().
        email("Field is not a valid email"),
})


export const userParamsValidation = z.object({
    id: z.string({
        required_error: "URL params must contain \"id\" field"
    })
});

export type User = z.infer<typeof UserSchemaValidation>;
