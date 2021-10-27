import { Field, InputType, ObjectType } from "type-graphql";
@ObjectType()
export class User {
    @Field(of => String)
    name: string;
    @Field(of => String)
    lastName: string;
    @Field(of => String)
    username: string;
}

@InputType()
export class UserInput {
    @Field(of => String)
    name: string;
    @Field(of => String)
    lastName: string;
    @Field(of => String)
    username: string;
    @Field(of => String)
    password: string;
}