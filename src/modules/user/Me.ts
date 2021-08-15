import { Query, Resolver } from "type-graphql";

@Resolver()
export class MeResolver {
    @Query(() => String, { nullable: true })
    async me(): Promise<string> {
        return "hi";
    }
}
