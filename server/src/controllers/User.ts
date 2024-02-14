import { Request, Response } from "express";
import User from "../models/User";
import { handleValidationErrors } from "../utils/SchemaExceptionHandler";
import userValidation from "../validations/UserValidation";
import { z } from "zod";


class UserController {
    public async store(req: Request, res: Response) {
        try {
            const { body } = req;
            const dataValidated = userValidation.parse(body);
            const user = new User(dataValidated);
            const savedUser = await user.save();
            return res.status(200).json(savedUser);
        } catch(err) {
            /* if(err instanceof z.ZodError) handleValidationErrors(res, err); */
            return res.status(500).send(err);
        }
    }
}

export default new UserController();
