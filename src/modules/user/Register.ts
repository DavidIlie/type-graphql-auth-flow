import { isAuth } from "./../middleware/isAuth";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import argon2 from "argon2";

import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
    @UseMiddleware(isAuth)
    @Query(() => String)
    async hello() {
        return "Hello World!";
    }

    @Mutation(() => User, { description: "register an account" })
    async register(
        @Arg("data") { email, firstName, lastName, password }: RegisterInput
    ): Promise<User> {
        const hashedPassword = await argon2.hash(password);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }).save();

        return user;
    }
}
