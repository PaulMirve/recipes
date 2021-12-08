import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { RecipeEntity } from "./recipe.entity";
import { Recipe, RecipeInput, UpdateRecipeInput } from "./recipe.types";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UserEntity } from "../user/user.entity";
import { uploadPhoto } from "../../helpers/upload-photo";
import { IngredientEntity } from "../ingredient/ingredient.entity";
import { StepEntity } from "../step/step.entity"; import { removeDuplicateTags } from "../../helpers/remove-duplicate-tags";
import { ValidIdRecipeMiddleware } from "../../middlewares/valid-idRecipe.middleware";
import { TagEntity } from "../tag/tag.entity";
import { updateIngredients } from "../../helpers/update-ingredients";
import { updateSteps } from "../../helpers/update-steps";
import { updateTags } from "../../helpers/update-tags";
import { updatePhoto } from "../../helpers/update-photo";
@Resolver(of => Recipe)
class RecipeResolver {
    @Query(returns => [Recipe])
    async getRecipes() {
        return RecipeEntity.find();
    }

    @Query(returns => Recipe)
    @UseMiddleware(ValidIdRecipeMiddleware)
    async getRecipe(
        @Arg("idRecipe", () => Int) idRecipe: number
    ) {
        return RecipeEntity.findOne({ idRecipe });
    }

    @Query(returns => [Recipe])
    async getRecipesByTag(
        @Arg("tagName") tagName: string
    ) {
        const tag = await TagEntity.findOne({
            where: { name: tagName },
            relations: ["recipes"]
        });
        return tag.recipes;
    }

    @Query(returns => [Recipe])
    @UseMiddleware(AuthMiddleware)
    async getRecipesFromFollowedPeople(
        @Arg("skip", () => Int, { nullable: true }) skip: number = 0,
        @Arg("limit", () => Int, { nullable: true }) limit: number = 15,
        @Ctx("user") { idUser }: UserEntity
    ) {
        const user = await UserEntity.findOne({
            where: { idUser },
            relations: ["following"]
        });
        const recipes = await RecipeEntity.createQueryBuilder("recipe")
            .where("recipe.idUser IN (:...following)", { following: user.following.map(usr => usr.idUser), })
            .orderBy("recipe.dateCreated", "DESC")
            .skip(skip)
            .take(limit)
            .getMany();

        return recipes;
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

    @Mutation(returns => Int)
    @UseMiddleware(AuthMiddleware, ValidIdRecipeMiddleware)
    async deleteRecipe(
        @Arg("idRecipe", () => Int) idRecipe: number,
        @Ctx("user") user: UserEntity
    ) {
        const recipe = await RecipeEntity.findOne({ idRecipe });

        if (recipe.idUser !== user.idUser) {
            throw new Error("This recipe doesn't belong to you 😠");
        }

        recipe.active = false;
        await RecipeEntity.save(recipe);
        return idRecipe;
    }

    @Mutation(returns => Recipe)
    @UseMiddleware(AuthMiddleware)
    async updateRecipe(
        @Arg("recipe") recipeInput: UpdateRecipeInput,
        @Ctx("user") user: UserEntity
    ) {
        const { photo, tags, steps, idRecipe, ingredients, name, description, numberOfPeople } = recipeInput;
        const recipe = await RecipeEntity.findOne({
            where: { idRecipe },
            relations: ["ingredients", "steps", "tags"]
        });

        if (recipe.idUser !== user.idUser) {
            throw new Error("This recipe doesn't belong to you 😠");
        }

        recipe.name = name;
        recipe.description = description;
        recipe.numberOfPeople = numberOfPeople;
        recipe.ingredients = await updateIngredients(recipe.ingredients, ingredients);
        recipe.steps = await updateSteps(recipe.steps, steps);
        recipe.tags = await removeDuplicateTags(updateTags(recipe.tags, tags));
        // recipe.photo = await updatePhoto(recipe.photo, photo);
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
    async bookmarkedBy(@Root() { idRecipe }: RecipeEntity) {
        const recipe = await RecipeEntity.findOne({
            where: { idRecipe },
            relations: ["bookmarkedBy"]
        });
        return recipe.bookmarkedBy;
    }

    @FieldResolver()
    async tags(@Root() { idRecipe }: RecipeEntity) {
        const recipe = await RecipeEntity.findOne({
            where: { idRecipe },
            relations: ["tags"]
        });
        return recipe.tags;
    }

    @FieldResolver()
    dateCreated(@Root() { dateCreated }: RecipeEntity) {
        return new Date(Number(dateCreated)).toLocaleDateString();
    }

    @FieldResolver()
    async comments(@Root() { idRecipe }: RecipeEntity) {
        const recipe = await RecipeEntity.findOne({
            where: { idRecipe },
            relations: ["comments"]
        });
        return recipe.comments;
    }
}