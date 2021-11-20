import { IsNotEmpty } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { IsRecipeExist } from "../../decorators/idRecipe.decorator";
import { IsUserExist } from "../../decorators/idUser.decorator";

@ObjectType()
export class Comment {
    @Field(of => Int)
    idComment: number;
    @Field(of => String)
    comment: string;
}

@InputType()
export class CommentInput {
    @Field(of => String)
    @IsNotEmpty()
    comment: string;

    @Field(of => Int)
    @IsRecipeExist()
    idRecipe: number;

    @Field(of => Int)
    @IsUserExist()
    idUser: number;
}