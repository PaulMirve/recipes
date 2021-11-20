import { Field, InputType, Int, ObjectType } from "type-graphql";
import { FileUpload, GraphQLUpload } from 'graphql-upload';

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
}