import { addTokenToBlacklist } from "./../utils/jwt";
import { isAuth } from "./../middleware/isAuth";
import { MyContext } from "../..//types/MyContext";
import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class LogoutResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
        await addTokenToBlacklist(ctx.req.cookies.access);
        ctx.res.clearCookie("access");
        return true;
    }
}
