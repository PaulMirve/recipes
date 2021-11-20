import { MiddlewareFn } from "type-graphql";
import { RecipeEntity } from "../schema/recipes/recipe.entity";

export const ValidIdRecipeMiddleware: MiddlewareFn = async ({ args }, next) => {
    const recipe = await RecipeEntity.findOne({ idRecipe: args.idRecipe });
    if (!recipe) {
        throw new Error("The recipe doesn't exist");
    }
    return next();
}