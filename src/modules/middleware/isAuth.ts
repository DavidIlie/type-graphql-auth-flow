import { verifyJWT } from "./../../lib/auth";
import { MyContext } from "src/types/MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    const verify = await verifyJWT(context.req.cookies.access);

    if (verify === null) throw new Error("not authenticated");

    return next();
};
