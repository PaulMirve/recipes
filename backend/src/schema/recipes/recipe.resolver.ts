import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { RecipeEntity } from "./recipe.entity";
import { Recipe, RecipeInput } from "./recipe.types";
import { createWriteStream } from 'fs';
import { v2 as cloudinary } from 'cloudinary'
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { User } from "../user/user.types";
import { UserEntity } from "../user/user.entity";
import { IngredientEntity } from "../ingredient/ingredient.entity";
import { uploadPhoto } from "../../helpers/upload-photo";

@Resolver()
class RecipeResolver {
    @Query(returns => String)
    getRecipes() {
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