import { IsNotEmpty } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { IsRecipeExist } from "../../decorators/idRecipe.decorator";
import { IsUserExist } from "../../decorators/idUser.decorator";
import { User } from "../user/user.types";

@ObjectType()
export class Comment {
    @Field(of => Int)
    idComment: number;
    @Field(of => String)
    comment: string;
    @Field(of => [User])
    likes: User[];
    @Field(of => User)
    user: User;
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