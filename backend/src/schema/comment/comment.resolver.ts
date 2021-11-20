import { Arg, Mutation, Resolver } from "type-graphql";
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
}