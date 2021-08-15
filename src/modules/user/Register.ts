import { Arg, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";

import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";

@Resolver()
export class RegisterResolver {
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

        await sendEmail(email, await createConfirmationUrl(user.id));

        return user;
    }
}
