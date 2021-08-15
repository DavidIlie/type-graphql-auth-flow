import { Request, Response } from "express";

export interface MyContext {
    req: Request & {
        session: {
            token?: any;
        };
    };
    res: Response;
}
