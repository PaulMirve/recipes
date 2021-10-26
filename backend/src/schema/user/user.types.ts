import { Field, InputType, ObjectType } from "type-graphql";
@ObjectType()
export class User {
    @Field(of => String)
    name: string;
}

@InputType()
export class UserInput {
    @Field(of => String)
    name: string;
}