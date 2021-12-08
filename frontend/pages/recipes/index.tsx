import styles from '@sass/pages/recipes.module.scss'
import Heading from "components/Heading"
import RecipeCard from "components/RecipeCard"
import { FormikTextInput } from 'components/TextInput'
import { Form, Formik } from 'formik'
import { Recipe, useGetRecipesFromFollowedPeopleQuery, useGetRecipesQuery } from "generated/graphql"
import { useGlobalContext } from 'hooks/useGlobalContext'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import * as Yup from 'yup'
interface Props {
    recipes: Recipe[]
}

const Recipes = () => {
    const router = useRouter();
    const { data: friendsRecipes, loading: friendsRecipesLoading } = useGetRecipesFromFollowedPeopleQuery();
    const { data: discoverRecipes, loading: discoverRecipesLoading } = useGetRecipesQuery();
    const { user } = useGlobalContext();

    const handleSearch = ({ phrase }: { phrase: string }) => {
        router.push(`/recipes/search/${phrase}`);
    }

    return (
        <div className={styles.recipes}>
            <Head>
                <title>ReciPies | Recipes</title>
            </Head>
            <Formik
                initialValues={{
                    phrase: ''
                }}
                validationSchema={Yup.object({
                    phrase: Yup.string().required('Please insert a term')
                })}
                onSubmit={handleSearch}>
                {
                    formik => (
                        <Form>
                            <FormikTextInput name="phrase" placeholder="Search by a term" />
                        </Form>
                    )
                }
            </Formik>
            {
                user &&
                <>
                    <Heading className="mt-md" variant='h2' fontWeight='bold'>NEW POSTS</Heading>
                    <div className={`${styles.discover} mt-sm`}>
                        {
                            friendsRecipesLoading ? <p>Loading...</p> :
                                (friendsRecipes?.getRecipesFromFollowedPeople as Recipe[]).map((recipe) => {
                                    return (
                                        <RecipeCard key={recipe.idRecipe} recipe={recipe} />
                                    );
                                })
                        }
                    </div>
                </>
            }
            <Heading className="mt-md" variant='h2' fontWeight='bold'>DISCOVER</Heading>
            <div className={`${styles.discover} mt-sm`}>
                {
                    discoverRecipesLoading ? <p>Loading...</p> :
                        (discoverRecipes?.getRecipes as Recipe[]).map((recipe) => {
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
