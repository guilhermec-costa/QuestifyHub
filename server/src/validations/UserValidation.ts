import { z } from "zod";

export const UserSchemaValidation = z.object({
    email: z.string().
        email("Field is not a valid email"),
    password: z.string({ required_error: "Required required" })
            .min(7, "Password should be at least 7 characters"),
    country: z.string()
});


export const userParamsValidation = z.object({
    id: z.string({
        required_error: "URL params must contain \"id\" field"
    })
});

export type User = z.infer<typeof UserSchemaValidation>;
