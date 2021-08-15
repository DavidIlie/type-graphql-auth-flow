import { User } from "./../entity/User";
import { Request, Response } from "express";

export interface MyContext {
    req: Request & {
        session: {
            token?: any;
        };
        user: User;
    };
    res: Response;
}
