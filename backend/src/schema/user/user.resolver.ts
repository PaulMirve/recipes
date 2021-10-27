import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserEntity } from "./user.entity";
import { User, UserInput } from "./user.types";
import bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
    @Query(returns => [User])
    getUsers() {
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