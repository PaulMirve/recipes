import { MiddlewareFn } from "type-graphql";
import IContext from "../interfaces/Context";
import { TagEntity } from "../schema/tag/tag.entity";
import { Tag, TagInput } from "../schema/tag/tag.types";

export const RemoveDuplicateTags = async (tags: TagInput[]): Promise<TagEntity[]> => {
    const dbTags = await TagEntity.find();
    return tags.map((tag) => {
        const dbTag = dbTags.find(t => t.name === tag.name);
        if (!dbTag) {
            const tagEntity: TagEntity = new TagEntity();
            tagEntity.name = tag.name;
            return tagEntity;
        } else {
            return dbTag;
        }
    });
}

export const RemoveDuplicateTagsMiddleware: MiddlewareFn = async ({ args }, next) => {
    args.recipe.tags = await RemoveDuplicateTags(args.recipe.tags);
    return next();
}