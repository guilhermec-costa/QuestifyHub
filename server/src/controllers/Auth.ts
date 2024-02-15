import { Request, Response } from "express";
import { z } from "zod";
import User from "models/User";
import { checkPassword } from "utils/cryptog";

class AuthController {
    public async login(req: Request, res: Response) {
        try {
            const loginBodyValidation = z.object({
                email: z.string({
                    required_error: "Email is empty"
                }).email(),
                password: z.string()
            });

            const { email, password } = loginBodyValidation.parse(req.body);
            const user = await User.findOne({ email: email });
            if(!user) return res.status(400).json({error: "User not found"});


            const pwdCorresponds = await checkPassword(password, user.password);
            return pwdCorresponds? res.status(200).json("LOGGED") : res.status(400).json("FAILED");
        } catch(err) {
            return res.status(400).json(err);
        }
    }

    public logout(req: Request, res: Response) {

    }
}

export default new AuthController();
