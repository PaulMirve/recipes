import { Field, InputType, Int, ObjectType } from "type-graphql";
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Ingredient, IngredientInput, IngredientUpdateInput } from "../ingredient/ingredient.types";
import { Step, StepInput, StepUpdateInput } from "../step/step.types";
import { IsInt, IsNotEmpty } from "class-validator";
import { Tag, TagInput } from "../tag/tag.types";
import { User } from "../user/user.types";
import { Comment } from "../comment/comment.types";
import { IsRecipeExist } from "../../decorators/idRecipe.decorator";

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
    @Field(of => [Ingredient])
    ingredients: Ingredient[];
    @Field(of => [Step])
    steps: Step[];
    @Field(of => [User])
    likes: User[];
    @Field(of => User)
    user: User;
    @Field(of => [User])
    bookmarkedBy: User[];
    @Field(of => [Tag])
    tags: Tag[];
    @Field(of => String)
    dateCreated: string;
    @Field(of => [Comment])
    comments: Comment[]
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
    steps: StepInput[];
    @Field(of => [TagInput])
    tags: TagInput[];
}

@InputType()
export class UpdateRecipeInput {
    @Field(of => Int)
    @IsRecipeExist()
    idRecipe: number;
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
    @Field(of => [IngredientUpdateInput])
    ingredients: IngredientUpdateInput[];
    @Field(of => [StepUpdateInput])
    steps: StepUpdateInput[];
    @Field(of => [TagInput])
    tags: TagInput[];
}