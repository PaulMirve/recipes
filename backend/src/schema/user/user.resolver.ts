import bcrypt from 'bcrypt';
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import ValidRolesMiddleware from "../../middlewares/role.middleware";
import { ValidUsernameMiddleware } from "../../middlewares/valid-username.middleware";
import { RoleEntity } from "../role/role.entity";
import { UserEntity } from "./user.entity";
import { User, UserInput } from "./user.types";

@Resolver(of => User)
export class UserResolver {
    @Query(returns => [User])
    @UseMiddleware(AuthMiddleware, ValidRolesMiddleware(["ADMIN_ROLE"]))
    getUsers() {
        return UserEntity.find();
    }

    @Query(returns => User)
    @UseMiddleware(ValidUsernameMiddleware)
    getUser(
        @Arg("username") username: string
    ) {
        return UserEntity.findOne({ username });
    }

    @Mutation(returns => User)
    async saveUser(
        @Arg("user") userInput: UserInput
    ) {
        userInput.password = await bcrypt.hash(userInput.password, 10);
        const user = UserEntity.create(userInput);
        return await UserEntity.save(user);
    }

    @Mutation(returns => User)
    @UseMiddleware(AuthMiddleware, ValidUsernameMiddleware)
    async followUser(
        @Arg("username", () => String) username: string,
        @Ctx("user") user: UserEntity
    ): Promise<User> {
        const userFollowed = await UserEntity.findOne({
            where: { username },
            relations: ["followers"]
        });

        const existentUser = userFollowed.followers.find(usr => usr.idUser === user.idUser);
        const indexOfUser = userFollowed.followers.indexOf(existentUser);
        if (indexOfUser > -1) {
            userFollowed.followers.splice(indexOfUser, 1);
        } else {
            userFollowed.followers.push(user);
        }

        UserEntity.save(userFollowed);
        return user;
    }

    @FieldResolver()
    role(@Root() { idRole }: UserEntity) {
        return RoleEntity.findOne({ idRole });
    }

    @FieldResolver()
    async followers(@Root() { idUser }: UserEntity) {
        const user = await UserEntity.findOne({
            where: { idUser },
            relations: ["followers"]
        });
        return user.followers;
    }

    @FieldResolver()
    async following(@Root() { idUser }: UserEntity) {
        const user = await UserEntity.findOne({
            where: { idUser },
            relations: ["following"]
        });
        return user.following;
    }

    @FieldResolver()
    async bookmarks(@Root() { idUser }: UserEntity) {
        const user = await UserEntity.findOne({
            where: { idUser },
            relations: ["bookmarks"]
        });
        return user.bookmarks;
    }

    @FieldResolver()
    async recipes(@Root() { idUser }: UserEntity) {
        const user = await UserEntity.findOne({
            where: { idUser },
            relations: ["recipes"]
        });
        return user.recipes;
    }
}