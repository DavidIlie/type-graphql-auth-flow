import { Length } from "class-validator";
import { ClassType, Field, InputType } from "type-graphql";

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
    @InputType({ isAbstract: true })
    class PasswordInput extends BaseClass {
        @Field()
        @Length(8, 255, { message: "password must be more than 8 characters" })
        password: string;
    }
    return PasswordInput;
};
