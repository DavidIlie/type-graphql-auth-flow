import { PasswordMixin } from "../../shared/PasswordInput";
import { Field, InputType } from "type-graphql";

@InputType()
export class ChangePasswordInput extends PasswordMixin(class {}) {
    @Field()
    token: string;
}
