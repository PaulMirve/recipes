import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Recipe {
    @Field(of => String)
    recipe: string;
    @Field(of => Int)
    description: string;
}

@InputType()
export class RecipeInput {
    @Field(of => String)
    name: string;
    @Field(of => Int)
    description: string;
}