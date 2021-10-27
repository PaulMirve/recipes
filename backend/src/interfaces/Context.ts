import { UserEntity } from "../schema/user/user.entity";

export default interface IContext {
    headers: {
        authorization: string
    },
    user: UserEntity
}