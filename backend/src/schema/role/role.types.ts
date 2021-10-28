import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Role{
    @Field(of => String)
    name: string;
}