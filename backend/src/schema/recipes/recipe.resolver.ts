import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { RecipeEntity } from "./recipe.entity";
import { Recipe, RecipeInput } from "./recipe.types";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UserEntity } from "../user/user.entity";
import { uploadPhoto } from "../../helpers/upload-photo";
import { IngredientEntity } from "../ingredient/ingredient.entity";
import { StepEntity } from "../step/step.entity";

@Resolver(of => Recipe)
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

    @FieldResolver()
    ingredients(@Root() { idRecipe }: RecipeEntity) {
        return IngredientEntity.find({ idRecipe });
    }

    @FieldResolver()
    steps(@Root() { idRecipe }: RecipeEntity) {
        return StepEntity.find({ idRecipe });
    }
}