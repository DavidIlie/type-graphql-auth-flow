import { isAuth } from "./../middleware/isAuth";
import { MyContext } from "src/types/MyContext";
import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class LogoutResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
        ctx.res.clearCookie("access");
        return true;
    }
}
