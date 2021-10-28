import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../user/user.types";

@ObjectType()
export class Login {
    @Field(of => User)
    user: User;
    @Field(of => String)
    jwt: string;
}
