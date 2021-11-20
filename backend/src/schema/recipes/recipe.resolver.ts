import { Arg, Args, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { RecipeEntity } from "./recipe.entity";
import { Recipe, RecipeInput } from "./recipe.types";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UserEntity } from "../user/user.entity";
import { uploadPhoto } from "../../helpers/upload-photo";
import { IngredientEntity } from "../ingredient/ingredient.entity";
import { StepEntity } from "../step/step.entity"; import { removeDuplicateTags } from "../../helpers/remove-duplicate-tags";
import { ValidIdRecipeMiddleware } from "../../middlewares/valid-idRecipe.middleware";
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
        const { photo, tags, ...rest } = recipeInput;
        const recipe = RecipeEntity.create(rest);
        recipe.tags = await removeDuplicateTags(tags);
        recipe.photo = await uploadPhoto(photo);
        recipe.idUser = user.idUser;
        return RecipeEntity.save(recipe);
    }

    @Mutation(returns => Recipe)
    @UseMiddleware(AuthMiddleware, ValidIdRecipeMiddleware)
    async likeRecipe(
        @Arg("idRecipe", () => Int) idRecipe: number,
        @Ctx("user") user: UserEntity
    ) {
        const recipe = await RecipeEntity.findOne({
            where: { idRecipe },
            relations: ['likes']
        });

        const existentUser = recipe.likes.find(u => u.idUser === user.idUser);
        const userIndex = recipe.likes.indexOf(existentUser);
        if (userIndex > -1) {
            recipe.likes.splice(userIndex, 1);
        } else {
            recipe.likes.push(user);
        }
        return RecipeEntity.save(recipe);
    }

    @Mutation(returns => Recipe)
    @UseMiddleware(AuthMiddleware, ValidIdRecipeMiddleware)
    async bookmarkRecipe(
        @Arg("idRecipe", of => Int) idRecipe: number,
        @Ctx("user") user: UserEntity
    ) {
        const recipe = await RecipeEntity.findOne({
            where: { idRecipe },
            relations: ["bookmarkedBy"]
        });

        const recipeExist = recipe.bookmarkedBy.find(usr => usr.idUser === user.idUser);
        const indexOfRecipe = recipe.bookmarkedBy.indexOf(recipeExist);
        if (indexOfRecipe > -1) {
            recipe.bookmarkedBy.splice(indexOfRecipe, 1);
        } else {
            recipe.bookmarkedBy.push(user);
        }
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

    @FieldResolver()
    async likes(@Root() { idRecipe }: RecipeEntity) {
        const recipe = await RecipeEntity.findOne({
            where: { idRecipe },
            relations: ["likes"]
        });
        return recipe.likes;
    }

    @FieldResolver()
    async user(@Root() { idUser }: RecipeEntity) {
        const recipe = await RecipeEntity.findOne({
            where: { idUser },
            relations: ["user"]
        });
        return recipe.user;
    }

    @FieldResolver()
    async bookmarkedBy(@Root() { idUser }: RecipeEntity) {
        const recipe = await RecipeEntity.findOne({
            where: { idUser },
            relations: ["bookmarkedBy"]
        });
        return recipe.bookmarkedBy;
    }
}