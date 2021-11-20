import { Field, InputType, Int, ObjectType } from "type-graphql";
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { IngredientInput } from "../ingredient/ingredient.types";
import { StepInput } from "../step/step.types";
import { IsInt, IsNotEmpty } from "class-validator";

@ObjectType()
export class Recipe {
    @Field(of => Int)
    idRecipe: number;
    @Field(of => String)
    name: string;
    @Field(of => String)
    description: string;
    @Field(of => Int)
    numberOfPeople: number;
    @Field(of => String)
    photo: string;
}

@InputType()
export class RecipeInput {
    @Field(of => String)
    @IsNotEmpty()
    name: string;
    @Field(of => String)
    @IsNotEmpty()
    description: string;
    @Field(of => Int)
    @IsInt()
    numberOfPeople: number;
    @Field(of => GraphQLUpload)
    photo: FileUpload;
    @Field(of => [IngredientInput])
    ingredients: IngredientInput[];
    @Field(of => [StepInput])
    steps: StepInput[]
}