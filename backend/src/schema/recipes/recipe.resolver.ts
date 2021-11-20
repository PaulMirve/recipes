import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { RecipeEntity } from "./recipe.entity";
import { Recipe, RecipeInput } from "./recipe.types";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UserEntity } from "../user/user.entity";
import { uploadPhoto } from "../../helpers/upload-photo";

@Resolver()
class RecipeResolver {
    @Query(returns => [Recipe])
    async getRecipes() {
        return RecipeEntity.find();
    }

    @Mutation(returns => Recipe)
    @UseMiddleware(AuthMiddleware)
    async saveRecipe(
        @Arg("recipe") recipeInput: RecipeInput,
        @Ctx("user") user: UserEntity
    ) {
        const { photo, ...rest } = recipeInput;
        const recipe = RecipeEntity.create(rest);
        recipe.photo = await uploadPhoto(photo);;
        recipe.idUser = user.idUser;
        return RecipeEntity.save(recipe);
    }
}