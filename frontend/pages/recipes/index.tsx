import styles from '@sass/pages/recipes.module.scss'
import client from "client"
import Heading from "components/Heading"
import RecipeCard from "components/RecipeCard"
import { FormikTextInput } from 'components/TextInput'
import { Form, Formik } from 'formik'
import { GetRecipesQuery, Recipe } from "generated/graphql"
import { getRecipesQuery } from "graphql/recipe.resolver"
import { GetServerSideProps } from "next"
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import * as Yup from 'yup'
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
    const router = useRouter();

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

            <Heading className="mt-md" variant='h2' fontWeight='bold'>DISCOVER</Heading>
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
