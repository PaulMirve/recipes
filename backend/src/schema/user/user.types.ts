import { IsEmail, isEmail, IsNotEmpty, IsString } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { IsEmailInUse } from "../../decorators/email.decorator";
import { IsUsernameExist } from "../../decorators/username.decorator";
import { Recipe } from "../recipes/recipe.types";
import { Role } from "../role/role.types";

@ObjectType()
export class User {
    @Field(of => String)
    name: string;
    @Field(of => String)
    lastName: string;
    @Field(of => String)
    email: string;
    @Field(of => String)
    username: string;
    @Field(of => Role)
    role: Role;
    @Field(of => [User])
    following: User[];
    @Field(of => [User])
    followers: User[];
    @Field(of => [Recipe])
    bookmarks: Recipe[];
    @Field(of => [Recipe])
    recipes: Recipe[];
}

@InputType()
export class UserInput {
    @Field(of => String)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(of => String)
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @Field(of => String)
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @IsEmailInUse()
    email: string;

    @Field(of => String)
    @IsString()
    @IsNotEmpty()
    @IsUsernameExist()
    username: string;

    @Field(of => String)
    @IsString()
    @IsNotEmpty()
    password: string;
}