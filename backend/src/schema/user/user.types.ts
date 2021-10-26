import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field(of => String)
    name: string;
}