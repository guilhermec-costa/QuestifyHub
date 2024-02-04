import { Request, Response } from "express";
import User from "../models/User";

class UserController {
    public async store(req: Request, res: Response): Promise<Response> {
        const { body } = req;
        try {
            const user = new User(body);
            const savedUser = await user.save();
            return res.status(200).json(savedUser);
        } catch(err) {
            console.log(err);
            return res.sendStatus(500);
        }
    }
}

export default new UserController();
