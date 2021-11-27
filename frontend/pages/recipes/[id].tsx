import client from 'client'
import Heading from 'components/Heading';
import { GetRecipeIdsQuery, GetRecipeQuery, GetRecipeQueryVariables, Recipe } from 'generated/graphql';
import { getRecipeIdsQuery, getRecipeQuery } from 'graphql/recipe.resolver';
import { GetStaticPaths, GetStaticProps, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styles from '@sass/pages/recipe.module.scss'

interface Props {
    recipe: Recipe
}

interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
    const { id } = params!;
    const { data } = await client.query<GetRecipeQuery, GetRecipeQueryVariables>({
        query: getRecipeQuery,
        variables: {
            idRecipe: Number(id)
        }
    });
    return {
        props: {
            recipe: data.getRecipe as Recipe
        }
    }
}

const Recipe = ({ recipe }: Props) => {
    return (
        <div className={styles.recipe}>
            <Heading variant='h1'>{recipe.name}</Heading>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.query<GetRecipeIdsQuery>({
        query: getRecipeIdsQuery
    });

    return {
        paths: data.getRecipes.map(({ idRecipe }) => ({
            params: {
                id: idRecipe.toString()
            }
        })),
        fallback: false
    }
}

export default Recipe
