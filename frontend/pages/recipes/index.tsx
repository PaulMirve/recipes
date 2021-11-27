import client from "client"
import { GetRecipesQuery, Recipe } from "generated/graphql"
import { getRecipesQuery } from "graphql/auth.resolver"
import { GetStaticProps } from "next"
import styles from '@sass/pages/recipes.module.scss'
import RecipeCard from "components/RecipeCard"
import Heading from "components/Heading"
interface Props {
    recipes: Recipe[]
}

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await client.query<GetRecipesQuery>({
        query: getRecipesQuery
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
            <Heading variant='h2' fontWeight='bold'>DISCOVER</Heading>
            <div className={styles.discover}>
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
