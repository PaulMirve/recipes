import { Query, Resolver } from "type-graphql";
import { User } from "./user.types";

@Resolver()
export class UserResolver {
    @Query(retunrs => User)
    getUsers() {
        const User: User = {
            name: 'Paul'
        }
        return User;
    }
}