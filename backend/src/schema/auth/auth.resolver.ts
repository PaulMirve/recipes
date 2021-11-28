import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserEntity } from "../user/user.entity";
import { Login } from "./auth.types";
import bcrypt from 'bcrypt';
import GenerateJWT from "../../helpers/generate-jwt";
import { User } from "../user/user.types";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

@Resolver()
export class AuthResolver {
    @Mutation(returns => Login)
    async login(
        @Arg("username") username: string,
        @Arg("password") password: string
    ): Promise<Login> {
        const user = await UserEntity.findOne({ username });
        if (!user) {
            throw new Error('Invalid username');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid password');
        }

        return {
            jwt: await GenerateJWT(username),
            user
        }
    }

    @Query(returns => User)
    @UseMiddleware(AuthMiddleware)
    isAuthenticated(
        @Ctx("user") user: UserEntity
    ) {
        return user;
    }
}