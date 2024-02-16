import { TLogger } from "types";
import { Request, Response, NextFunction } from "express";

export const Logger = (req: Request, res:Response, next:NextFunction): void => {
    const logMessage: TLogger = {
        method: req.method,
        url: req.url,
        body: req.body,
        headers: req.headers,
        timestamp: Date.now()
    }
    console.log(logMessage);
    next()
}
