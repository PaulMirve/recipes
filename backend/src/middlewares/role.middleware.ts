import { MiddlewareFn } from "type-graphql";
import IContext from "../interfaces/Context";
import { RoleEntity } from "../schema/role/role.entity";

const ValidRolesMiddleware = (roles: string[]): MiddlewareFn<IContext> => {
    return async ({ context }, next) => {
        const result = await next();
        const role = await RoleEntity.findOne({ idRole: context.user.idRole });
        if (!roles.includes(role.name)) {
            throw new Error('Unauthorized');
        }
        return result;
    };
}

export default ValidRolesMiddleware;