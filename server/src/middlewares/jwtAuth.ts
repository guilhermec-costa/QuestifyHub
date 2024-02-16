import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express"
import { TLogger } from "types";

export const isAuthenticated = (req: Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(400).json({ error: "You are not logged in yet"});

    jwt.verify(token, process.env.JWT_SECRET as string,
                (err:any, user:any) => {
                    if(err) return res.status(400).json({ error: "Invalid Token"});
                    next();
            });
};


