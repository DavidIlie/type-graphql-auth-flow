import { checkIfTokenIsInBlacklist } from "./../utils/jwt";
import { User } from "./../../entity/User";
import { verifyJWT } from "../utils/jwt";
import { MyContext } from "../../types/MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    const verify = await verifyJWT(context.req.cookies.access);

    if (verify === null) throw new Error("not authenticated");

    const isBlacklisted = await checkIfTokenIsInBlacklist(
        context.req.cookies.access
    );

    if (isBlacklisted) throw new Error("not authenticated");

    const user = await User.findOne(verify);

    // @ts-ignore
    context.req.user = user;

    return next();
};
