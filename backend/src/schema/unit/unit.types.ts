import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Unit {
    @Field(of => String)
    idUnit: number;
    @Field(of => String)
    name: string;
}