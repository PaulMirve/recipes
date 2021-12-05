import { createUnionType } from "type-graphql";
import { Recipe } from "../recipes/recipe.types";
import { User } from "../user/user.types";

export const searchResultUnion = createUnionType({
    name: 'SearchResult',
    types: () => [User, Recipe] as const,
    resolveType: value => {
        if ("username" in value) {
            return User;
        }
        if ("numberOfPeople" in value) {
            return Recipe;
        }
        return undefined;
    }
});