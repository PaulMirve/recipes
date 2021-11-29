import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Unit } from "../unit/unit.types";

@ObjectType()
export class Ingredient {
    @Field(of => String)
    name: string;
    @Field(of => Int)
    quantity: number;
    @Field(of => Unit)
    unit: Unit
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