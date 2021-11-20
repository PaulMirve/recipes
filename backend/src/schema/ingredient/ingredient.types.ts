import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Ingredient {
    @Field(of => String)
    name: string;
    @Field(of => Int)
    quantity: number;
}

@InputType()
export class IngredientInput {
    @Field(of => String)
    name: string;
    @Field(of => Int)
    quantity: number;
    @Field(of => Int)
    idUnit: number;
}