import { createUnionType } from "type-graphql";
import { RecipeEntity } from "../recipes/recipe.entity";
import { Recipe } from "../recipes/recipe.types";
import { TagEntity } from "../tag/tag.entity";
import { Tag } from "../tag/tag.types";
import { UserEntity } from "../user/user.entity";
import { User } from "../user/user.types";

export const searchResultUnion = createUnionType({
    name: 'SearchResult',
    types: () => [User, Recipe, Tag] as const,
    resolveType: value => {
        if (value instanceof UserEntity) {
            return User;
        }
        if (value instanceof RecipeEntity) {
            return Recipe;
        }
        if (value instanceof TagEntity) {
            return Tag;
        }
        return undefined;
    }
});