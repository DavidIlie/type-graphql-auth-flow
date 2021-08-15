import { User } from "./../../entity/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { redis } from "../../redis";
import { sendEmail } from "../utils/sendEmail";
import { forgetPasswordPrefix } from "../constants/redisPrefixes";

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean, {
        description: "reset account password",
    })
    async forgotPassword(@Arg("email") email: string): Promise<boolean> {
        const user = await User.findOne({ email });

        if (!user) {
            return false;
        }

        const token = v4();
        await redis.set(
            forgetPasswordPrefix + token,
            user.id as any,
            "ex",
            60 * 60 * 24
        ); // 1 day expiration

        await sendEmail(
            email,
            `https://localhost:3000/user/change-password/${token}`
        );

        return true;
    }
}
