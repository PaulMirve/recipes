import { Field, InputType, Int, ObjectType } from "type-graphql";
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { IngredientInput } from "../ingredient/ingredient.types";
import { StepInput } from "../step/step.types";

@ObjectType()
export class Recipe {
    @Field(of => String)
    name: string;
    @Field(of => Int)
    description: string;
}

@InputType()
export class RecipeInput {
    @Field(of => String)
    name: string;
    @Field(of => String)
    description: string;
    @Field(of => Int)
    numberOfPeople: number;
    @Field(of => GraphQLUpload)
    photo: FileUpload;
    @Field(of => [IngredientInput])
    ingredients: IngredientInput[];
    @Field(of => [StepInput])
    steps: StepInput[]
}