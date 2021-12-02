import { MiddlewareFn } from "type-graphql";
import { UserEntity } from "../schema/user/user.entity";

export const ValidUsernameMiddleware: MiddlewareFn = async ({ args }, next) => {
    const user = await UserEntity.findOne({ username: args.username });
    if (!user) {
        throw new Error("The user doesn't exist");
    }
    return next();
}