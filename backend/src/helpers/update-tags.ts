import { TagEntity } from "../schema/tag/tag.entity";
import { TagInput } from "../schema/tag/tag.types";

export const updateTags = (tags: TagEntity[], updatedTags: TagInput[]) => {
    const toDeleteTags = tags.filter(tag => !updatedTags.some(tag2 => tag.name === tag2.name));
    const toUpdateTags = updatedTags.filter(tag => !toDeleteTags.some(tag2 => tag.name === tag2.name));
    return toUpdateTags;
}