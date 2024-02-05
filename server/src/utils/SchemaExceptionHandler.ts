import { Response } from "express";
import { ZodError } from "zod";

export const handleValidationErrors = (res:Response, err:ZodError) => {
    const validationErrors = err.errors.map(validationError => {
        return {
            field: validationError.path.join("."),
            message: validationError.message
        }
    });

    return res.status(400).json(validationErrors);
}
