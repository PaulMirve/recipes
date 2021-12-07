import axios from "axios"
import client from "client"
import { GetRecipeQuery, GetRecipeQueryVariables, Ingredient, Recipe, Step } from "generated/graphql"
import { getRecipeQuery } from "graphql/recipe.resolver"
import RecipeForm, { RecipeFormSubmitArgs } from "layout/RecipeForm"
import { GetServerSideProps } from "next"
import Head from 'next/head'
import { ParsedUrlQuery } from "querystring"

interface Props {
    idRecipe: number,
    ingredients: Ingredient[],
    steps: Step[],
    name: string,
    description: string,
    numberOfPeople: number,
    tags: string[],
    photo: string,
    username: string
}

const UpdateRecipe = ({ idRecipe, username, ...props }: Props) => {
    const onFormSubmit = async ({ name, description, people, photo, photoFile, steps, ingredients, tags }: RecipeFormSubmitArgs) => {
        let formData = new FormData();
        formData.append("operations", `
        {
            "query": "mutation ($recipe: UpdateRecipeInput!) {updateRecipe(recipe: $recipe){name} }",
            "variables": {
                "recipe": {
                    "idRecipe": ${idRecipe},
                    "name": "${name}",
                    "description": "${description}",
                    "photo": null,
                    "numberOfPeople": ${people},
                    "ingredients": [${ingredients.map(({ idIngredient, name, quantity, unit: { idUnit } }) => JSON.stringify({ idIngredient, name, quantity: Number(quantity), idUnit: Number(idUnit) }))}],
                    "steps": [${steps.map(({ description, idStep }) => JSON.stringify({ description, idStep }))}],
                    "tags": [${tags.map((tag) => JSON.stringify({ name: tag, idRecipe: 0 }))}]
                }
            }
        }
        `);
        formData.append("map", `{ "0": ["variables.recipe.photo"] }`);
        formData.append("0", photoFile!);

        await axios.post('http://localhost:8081/graphql', formData, {
            headers: {
                authorization: localStorage.getItem('token') || ""
            }
        });
    }
    return (
        <>
            <Head>
                <title>ReciPies | Update</title>
            </Head>
            <RecipeForm onFormSubmit={onFormSubmit} {...props} />
        </>
    )
}

interface Params extends ParsedUrlQuery {
    id: string
}
export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
    if (params) {
        const { id } = params;

        const recipe = await client.query<GetRecipeQuery, GetRecipeQueryVariables>({
            query: getRecipeQuery,
            variables: {
                idRecipe: Number(id)
            },
            fetchPolicy: 'no-cache'
        })
            .then(res => res.data.getRecipe as Recipe)
            .catch(err => null);

        if (!recipe) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/404'
                }
            }
        }

        const { tags, ...rest } = recipe;
        return {
            props: {
                tags: tags.map(tag => tag.name),
                username: recipe.user.username,
                ...rest
            }
        }
    }

    return {
        redirect: {
            permanent: false,
            destination: '/404'
        }
    }
}

export default UpdateRecipe
