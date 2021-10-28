import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { RecipeEntity } from "./recipe.entity";
import { Recipe, RecipeInput } from "./recipe.types";

@Resolver()
class RecipeResolver {
    @Query(returns => String)
    getRecipes() {
    }

    @Mutation(returns => Recipe)
    saveRecipe(
        @Arg("recipe") recipeInput: RecipeInput
    ) {
        const recipe = RecipeEntity.create(recipeInput);
        return RecipeEntity.save(recipe);
    }
}