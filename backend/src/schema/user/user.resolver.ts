import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserInput } from "./user.types";

@Resolver()
export class UserResolver {
    @Query(returns => User)
    getUsers() {
        const User: User = {
            name: 'Paul'
        }
        return User;
    }

    @Mutation(returns => User)
    saveUser(
        @Arg("user") userInput: UserInput
    ) {
        return {
            name: userInput.name
        }
    }
}