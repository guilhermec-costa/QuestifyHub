import { Request, Response } from "express";
import User from "../models/User";
import { handleValidationErrors } from "../utils/SchemaExceptionHandler";
import {userParamsValidation, UserSchemaValidation} from "../validations/UserValidation";
import { z } from "zod";
import { hashPassword } from "utils/cryptog";

class UserController {
    public async store(req: Request, res: Response) {
        try {
            const { body } = req;
            const userCreationBody = UserSchemaValidation.parse(body);
            userCreationBody.password = await hashPassword(userCreationBody.password);
            
            const user = new User(userCreationBody);
            const savedUser = await user.save();
            return res.status(200).json(user);
        } catch(err) {
           err = err instanceof z.ZodError ? handleValidationErrors(res, err) : err;
           return res.status(500).json(err);
        }
    }

    public async all(req: Request, res:Response) {
        const users = await User.find().select({"fullname": 1, "email": 1});
        return res.status(200).json(users);
    }

    public async byUserId(req: Request, res: Response) {
        const { id: userId } = userParamsValidation.parse(req.params);
        const user = await User.findById(userId);
        
        return res.status(200).json(user);
    }

    public async delete(req: Request, res: Response) {
       const { id: userId } = userParamsValidation.parse(req.params);
       const user = await User.findById(userId);
       if(!user) return res.status(400).json({ message: "User not found" });

       await user?.deleteOne();
       return res.status(200).json({ message: "User was deleted" });
    }

}

export default new UserController();
