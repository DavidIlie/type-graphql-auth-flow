import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { User } from "./../../entity/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import * as argon2 from "argon2";
import { redis } from "../../redis";
import { forgetPasswordPrefix } from "../constants/redisPrefixes";

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, {
        description: "change account password",
        nullable: true,
    })
    async changePassword(
        @Arg("data") { token, password }: ChangePasswordInput
    ): Promise<User | null> {
        const userId = await redis.get(forgetPasswordPrefix + token);

        if (!userId) {
            return null;
        }

        const user = await User.findOne(userId);

        if (!user) {
            return null;
        }

        await redis.del(forgetPasswordPrefix + token);

        user.password = await argon2.hash(password);
        await user.save();

        return user;
    }
}
