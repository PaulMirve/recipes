import { MiddlewareFn } from "type-graphql";
import { CommentEntity } from "../schema/comment/comment.entity";

export const ValidIdCommentMiddleware: MiddlewareFn = async ({ args }, next) => {
    const comment = await CommentEntity.findOne({ idComment: args.idComment });
    if (!comment) {
        throw new Error("The comment doesn't exist");
    }
    return next();
}