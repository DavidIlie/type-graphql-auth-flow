import { LoginInput } from "./login/LoginInput";
import { createAccessToken } from "./../../lib/auth";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";

import { User } from "../../entity/User";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class LoginResolver {
    @Mutation(() => User, {
        description: "login to your account",
        nullable: true,
    })
    async login(
        @Arg("data") { email, password }: LoginInput,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return null;
        }

        const valid = await argon2.verify(user.password, password);

        if (!valid) {
            return null;
        }

        const accessToken = createAccessToken(user);

        ctx.res.cookie("access", accessToken);

        return user;
    }
}
