import { Request, Response } from "express";
import User from "../models/User";
import { handleValidationErrors } from "../utils/SchemaExceptionHandler";
import userValidation from "../validations/UserValidation";
import { z } from "zod";
import { hashPassword } from "utils/cryptog";

class UserController {
    public async store(req: Request, res: Response) {
        try {
            const { body } = req;
            const userCreationBody = userValidation.parse(body);
            userCreationBody.password = await hashPassword(userCreationBody.password);
            const user = new User(userCreationBody);
            const savedUser = await user.save();
            return res.status(200).json("a");
        } catch(err) {
           if(err instanceof z.ZodError) handleValidationErrors(res, err);
           return res.status(500).send(err);
        }
    }

    public async all(req: Request, res:Response) {
        const users = await User.find().select({"fullname": 1, "email": 1});
        return res.status(200).json(users);
    }
}

export default new UserController();
