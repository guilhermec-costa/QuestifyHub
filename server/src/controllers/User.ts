import { Request, Response } from "express";
import User from "../models/User";
import { z } from "zod

class UserController {
    public async store(req: Request, res: Response,
                      validationSchema: z.ZodObject<any, any, any>): Promise<Response> {
        const { body } = req;
        try {
            const validation = validationSchema.parse(body);
            /* if(!validation.success) { */
            /*     console.log(validation.error); */
            /* } */
            /* const user = new User(body); */
            /* const savedUser = await user.save(); */
            return res.sendStatus(200);
        } catch(err) {
            if(err instanceof z.ZodError) {
            }
            return res.sendStatus(500);
        }
    }
}

export default new UserController();
