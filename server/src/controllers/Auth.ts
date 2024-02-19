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
                email: z.string().email().min(1, {message: "Email required"}),
                password: z.string().min(1, {message: "Password required"})
            });

            const { email, password } = loginBodyValidation.parse(req.body);
            const user = await User.findOne({ email: email });
            if(!user) return res.status(400).json({email: "User not found", password: ""});

            const pwdCorresponds = await checkPassword(password, user.password);
            if(!pwdCorresponds) return res.status(401).json({ email:"", password: "Password does not match"});

            const token = new Jwt(user.id, 3600); 
            token.sign();
            /* req.user = user; */
            return pwdCorresponds? res.status(200).json({ token: token.signedToken, user: user }) : res.status(400).json("Failed to login");
        } catch(err) {
            return res.status(400).json(err);
        }
    }

    public logout(req: Request, res: Response) {
    }
}

export default new AuthController();
