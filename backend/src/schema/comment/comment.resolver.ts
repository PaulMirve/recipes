import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { ValidIdCommentMiddleware } from "../../middlewares/valid-idCommen.middleware";
import { UserEntity } from "../user/user.entity";
import { CommentEntity } from "./comment.entity";
import { Comment, CommentInput } from "./comment.types";

@Resolver(of => Comment)
class CommentResolver {
    @Mutation(returns => Comment)
    saveComment(
        @Arg("comment") commentInput: CommentInput
    ) {
        const comment = CommentEntity.create(commentInput);
        return CommentEntity.save(comment);
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
}