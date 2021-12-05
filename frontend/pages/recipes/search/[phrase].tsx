import styles from '@sass/pages/search-recipe.module.scss'
import client from 'client'
import { Tab, Tabs, TabsWrapper, TabPage } from 'components/Tabs'
import { Recipe, SearchQuery, SearchQueryVariables, User } from 'generated/graphql'
import { searchQuery } from 'graphql/search.resolver'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface Props {
    users: User[],
    recipes: Recipe[]
}

const SearchRecipe = ({ users, recipes }: Props) => {
    return (
        <div className={styles.main}>
            <TabsWrapper initialValue={1}>
                <Tabs>
                    <Tab value={1} icon="Person" label="User" />
                    <Tab value={2} icon="BookOpen" label="Recipes" />
                </Tabs>
                <TabPage value={1}>
                    <div className={styles.users}>
                        {
                            users.map(({ username }) => (
                                <div key={username}>{username}</div>
                            ))
                        }
                    </div>
                </TabPage>
                <TabPage value={2}>
                    <div className={styles.recipes}>
                        {
                            recipes.map(({ idRecipe, name }) => (
                                <div key={idRecipe}>{name}</div>
                            ))
                        }
                    </div>
                </TabPage>
            </TabsWrapper>
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
