import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { ValidIdCommentMiddleware } from "../../middlewares/valid-idCommen.middleware";
import { ValidIdRecipeMiddleware } from "../../middlewares/valid-idRecipe.middleware";
import { RecipeEntity } from "../recipes/recipe.entity";
import { UserEntity } from "../user/user.entity";
import { CommentEntity } from "./comment.entity";
import { Comment, CommentInput } from "./comment.types";

@Resolver(of => Comment)
export class CommentResolver {
    @Mutation(returns => Comment)
    @UseMiddleware(AuthMiddleware)
    saveComment(
        @Arg("comment") commentInput: CommentInput,
        @Ctx('user') { idUser }: UserEntity
    ) {
        if (RecipeEntity.findOne({ idRecipe: commentInput.idRecipe })) {
            const comment = CommentEntity.create({ ...commentInput, idUser });
            return CommentEntity.save(comment);
        } else {
            throw new Error("The recipe doesn't exist");
        }

    }

    @Mutation(returns => Comment)
    @UseMiddleware(AuthMiddleware, ValidIdCommentMiddleware)
    async likeComment(
        @Arg("idComment", () => Int) idComment: number,
        @Ctx("user") user: UserEntity
    ) {
        const comment = await CommentEntity.findOne({
            where: { idComment },
            relations: ["likes"]
        });

        const existentComment = comment.likes.find(usr => usr.idUser === user.idUser);
        const indexOfComment = comment.likes.indexOf(existentComment);
        if (indexOfComment > -1) {
            comment.likes.splice(indexOfComment, 1);
        } else {
            comment.likes.push(user);
        }
        return CommentEntity.save(comment);
    }

    @Query(of => [Comment])
    @UseMiddleware(ValidIdRecipeMiddleware)
    async getRecipeComments(
        @Arg("idRecipe", of => Int) idRecipe: number
    ) {
        return await CommentEntity.find({ idRecipe });
    }

    @FieldResolver()
    async likes(@Root() { idComment }: CommentEntity) {
        const comment = await CommentEntity.findOne({
            where: { idComment },
            relations: ["likes"]
        });
        return comment.likes;
    }

    @FieldResolver()
    async user(@Root() { idComment }: CommentEntity) {
        const comment = await CommentEntity.findOne({
            where: { idComment },
            relations: ["user"]
        });
        return comment.user;
    }

    @FieldResolver()
    dateCreated(@Root() { dateCreated }: CommentEntity) {
        return new Date(Number(dateCreated)).toLocaleString();
    }
}