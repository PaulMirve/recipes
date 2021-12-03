import styles from '@sass/pages/recipes.module.scss'
import client from "client"
import Heading from "components/Heading"
import RecipeCard from "components/RecipeCard"
import { GetRecipesQuery, Recipe } from "generated/graphql"
import { getRecipesQuery } from "graphql/recipe.resolver"
import { GetServerSideProps } from "next"
import Head from 'next/head'
interface Props {
    recipes: Recipe[]
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await client.query<GetRecipesQuery>({
        query: getRecipesQuery,
        fetchPolicy: 'no-cache'
    });
    return {
        props: {
            recipes: data.getRecipes
        }
    }
}

const Recipes = ({ recipes }: Props) => {
    return (
        <div className={styles.recipes}>
            <Head>
                <title>ReciPies | Recipes</title>
            </Head>
            <Heading variant='h2' fontWeight='bold'>DISCOVER</Heading>
            <div className={`${styles.discover} mt-sm`}>
                {
                    recipes.map((recipe) => {
                        return (
                            <RecipeCard key={recipe.idRecipe} recipe={recipe} />
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Recipes
