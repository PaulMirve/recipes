import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserEntity } from "./user.entity";
import { User, UserInput } from "./user.types";
import bcrypt from 'bcrypt';
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { Context } from "apollo-server-core";

@Resolver()
export class UserResolver {
    @Query(returns => [User])
    @UseMiddleware(AuthMiddleware)
    getUsers(
        @Ctx("user") user: UserEntity
    ) {
        return UserEntity.find();
    }

    @Mutation(returns => User)
    async saveUser(
        @Arg("user") userInput: UserInput
    ) {
        userInput.password = await bcrypt.hash(userInput.password, 10);
        const user = UserEntity.create(userInput);
        return await UserEntity.save(user);
    }
}