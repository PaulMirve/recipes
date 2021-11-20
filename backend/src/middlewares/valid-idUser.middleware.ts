import { MiddlewareFn } from "type-graphql";
import { UserEntity } from "../schema/user/user.entity";

export const ValidIdUserMiddleware: MiddlewareFn = async ({ args }, next) => {
    const user = await UserEntity.findOne({ idUser: args.idUser });
    if (!user) {
        throw new Error("The user doesn't exist");
    }
    return next();
}