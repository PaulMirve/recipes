import styles from '@sass/pages/search-recipe.module.scss'
import client from 'client'
import { SearchQuery, SearchQueryVariables, User, Recipe } from 'generated/graphql'
import { searchQuery } from 'graphql/search.resolver'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface Props {
    users: User[],
    recipes: Recipe[]
}

const SearchRecipe = ({ users, recipes }: Props) => {
    return (
        <div className={styles.padding}>

        </div>
    )
}

interface Params extends ParsedUrlQuery {
    phrase: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
    if (params) {
        const { phrase } = params;
        const { data } = await client.query<SearchQuery, SearchQueryVariables>({
            query: searchQuery,
            variables: {
                phrase
            },
            fetchPolicy: 'no-cache'
        });
        const users: User[] = [];
        const recipes: Recipe[] = [];
        data.search.forEach((result) => {
            if (result.__typename === "User") {
                users.push(result as User);
            } else if (result.__typename === "Recipe") {
                recipes.push(result as Recipe);
            }
        });
        return {
            props: {
                users,
                recipes
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

export default SearchRecipe
