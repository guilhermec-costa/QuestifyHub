import { Request } from "express"
import { User } from "validations/UserValidation"

export type TLogger = {
    method: string,
    url: string,
    headers: any,
    body?: any,
    timestamp: number
}

export interface customRequest extends Request {
    user?: User
};
