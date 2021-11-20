import { TagEntity } from "../schema/tag/tag.entity";
import { TagInput } from "../schema/tag/tag.types";

export const removeDuplicateTags = async (tags: TagInput[]): Promise<TagEntity[]> => {
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
