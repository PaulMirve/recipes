import { MiddlewareFn } from "type-graphql";

interface IContext {
    headers: {
        authorization: string
    }
}
export const AuthMiddleware: MiddlewareFn<IContext> = ({ context }, next) => {
    if(!context.headers.authorization){
        throw new Error('Unauthorized');
    }
    return next();
}