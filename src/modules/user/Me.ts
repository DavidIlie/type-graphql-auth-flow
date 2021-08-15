import { User } from "./../../entity/User";
import { MyContext } from "./../../types/MyContext";
import { isAuth } from "./../middleware/isAuth";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class MeResolver {
    @UseMiddleware(isAuth)
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        return ctx.req.user;
    }
}
