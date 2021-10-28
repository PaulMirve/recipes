import { IsNotEmpty, IsString } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { IsUsernameExist } from "../../decorators/username.decorator";
import { Role } from "../role/role.types";

@ObjectType()
export class User {
    @Field(of => String)
    name: string;
    @Field(of => String)
    lastName: string;
    @Field(of => String)
    username: string;
    @Field(of => Role)
    role: Role;
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
    @IsUsernameExist()
    username: string;

    @Field(of => String)
    @IsString()
    @IsNotEmpty()
    password: string;
}