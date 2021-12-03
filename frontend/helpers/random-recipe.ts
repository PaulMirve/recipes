import client from "client";
import { GetRecipeIdsQuery } from "generated/graphql";
import { getRecipeIdsQuery } from "graphql/recipe.resolver";
import { NextRouter } from "next/dist/client/router";

export const randomRecipe = async (router: NextRouter) => {
    const { data } = await client.query<GetRecipeIdsQuery>({
        query: getRecipeIdsQuery
    });
    const ids = data.getRecipes;
    const randomIndex = Math.floor(Math.random() * (ids.length));
    router.push(`/recipes/${ids[randomIndex].idRecipe}`)
}