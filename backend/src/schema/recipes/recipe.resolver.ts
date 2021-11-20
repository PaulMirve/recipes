import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { RecipeEntity } from "./recipe.entity";
import { Recipe, RecipeInput } from "./recipe.types";
import { createWriteStream } from 'fs';
import { v2 as cloudinary } from 'cloudinary'
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { User } from "../user/user.types";
import { UserEntity } from "../user/user.entity";

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
        const { filename, createReadStream } = await photo;

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        await new Promise(async (resolve, reject) =>
            createReadStream()
                .pipe(createWriteStream(`./uploads/${filename}`))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
        const { secure_url } = await cloudinary.uploader.upload(`./uploads/${filename}`);
        const recipe = RecipeEntity.create(rest);
        recipe.photo = secure_url;
        recipe.idUser = user.idUser;
        return RecipeEntity.save(recipe);
    }
}