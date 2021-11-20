import { IsNotEmpty } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { IsRecipeExist } from "../../decorators/idRecipe.decorator";

@ObjectType()
export class Tag {
    @Field(of => String)
    name: string;
}

@InputType()
export class TagInput {
    @Field(of => String)
    @IsNotEmpty()
    name: string;

    @Field(of => Int)
    @IsRecipeExist()
    idRecipe: number;
}