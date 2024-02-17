import { Request, Response } from "express";
import { z } from "zod";
import User from "models/User";
import { checkPassword } from "utils/cryptog";
import Jwt from "utils/jwt";

class AuthController {
    public async login(req: Request, res: Response) {
        console.log(req.body);
        try {
            const loginBodyValidation = z.object({
                email: z.string().email(),
                password: z.string().min(1, {message: "Password too small"})
            });

            const { email, password } = loginBodyValidation.parse(req.body);
            const user = await User.findOne({ email: email });
            if(!user) return res.status(400).json({error: "User not found"});

            const pwdCorresponds = await checkPassword(password, user.password);
            if(!pwdCorresponds) return res.status(401).json({ error: "Password does not match"});

            const token = new Jwt(user.id, 3600); 
            token.sign();
            /* req.user = user; */
            return pwdCorresponds? res.status(200).json({ token: token.signedToken }) : res.status(400).json("Failed to login");
        } catch(err) {
            return res.status(400).json(err);
        }
    }

    public logout(req: Request, res: Response) {
    }
}

export default new AuthController();
