import { MiddlewareFn } from "type-graphql";
import ValidateJWT from "../helpers/validate-jwt";
import { UserEntity } from "../schema/user/user.entity";

interface IContext {
    headers: {
        authorization: string
    },
    user: UserEntity
}
export const AuthMiddleware: MiddlewareFn<IContext> = async ({ context }, next) => {
    if (!context.headers.authorization) {
        throw new Error('Unauthorized');
    }
    const { username } = ValidateJWT(context.headers.authorization) as { username: string, iat: number, exp: number };
    const user = await UserEntity.findOne({ username });
    if (!user) {
        throw new Error('Unauthorized');
    }
    context.user = user;
    return next();
}