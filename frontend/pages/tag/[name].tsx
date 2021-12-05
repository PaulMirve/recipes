import styles from '@sass/pages/search-by-tag.module.scss'
import client from 'client'
import Heading from 'components/Heading'
import RecipeCard from 'components/RecipeCard'
import { GetRecipesByTagQuery, GetRecipesByTagQueryVariables, Recipe } from 'generated/graphql'
import { getRecipeByTagQuery } from 'graphql/recipe.resolver'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'

interface Props {
    recipes: Recipe[],
    tag: string
}

const SearchByTag = ({ recipes, tag }: Props) => {
    return (
        <div className={styles.main}>
            <Head>
                <title>Recipes | Tag</title>
            </Head>
            <Heading casing='uppercase' fontWeight='bold' className={`mb-md ${styles.title}`}>Recipes with {tag} tag</Heading>
            <div className={styles.recipes}>
                {
                    recipes.map((recipe) => (
                        <RecipeCard key={recipe.idRecipe} recipe={recipe} />
                    ))
                }
            </div>
        </div>
    )
}

interface Params extends ParsedUrlQuery {
    name: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
    if (params) {
        const { name } = params;
        const recipes = await client.query<GetRecipesByTagQuery, GetRecipesByTagQueryVariables>({
            query: getRecipeByTagQuery,
            variables: {
                tagName: name
            }
        })
            .then(res => res.data.getRecipesByTag as Recipe[])
            .catch(err => null);
        if (!recipes) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/404'
                }
            }
        }
        return {
            props: {
                recipes,
                tag: name
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

export default SearchByTag
