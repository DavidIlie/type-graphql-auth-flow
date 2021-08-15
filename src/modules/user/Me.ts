import { isAuth } from "./../middleware/isAuth";
import { Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class MeResolver {
    @UseMiddleware(isAuth)
    @Query(() => String, { nullable: true })
    async me(): Promise<string> {
        return "hi";
    }
}
