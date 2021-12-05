import styles from '@sass/pages/search-recipe.module.scss'
import client from 'client'
import RecipeRow from 'components/RecipeRow'
import { Tab, Tabs, TabsWrapper, TabPage } from 'components/Tabs'
import UserRow from 'components/UserRow'
import { Recipe, SearchQuery, SearchQueryVariables, Tag, User } from 'generated/graphql'
import { searchQuery } from 'graphql/search.resolver'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import Heading from 'components/Heading'
import Icon from 'components/Icon'

interface Props {
    users: User[],
    recipes: Recipe[],
    tags: Tag[]
}

const SearchRecipe = ({ users, recipes, tags }: Props) => {
    return (
        <div className={styles.main}>
            <Head>
                <title>ReciPies | Search</title>
            </Head>
            <TabsWrapper initialValue={1}>
                <Tabs>
                    <Tab value={1} icon="BookOpen" label="Recipes" results={recipes.length} />
                    <Tab value={2} icon="Person" label="User" results={users.length} />
                    <Tab value={3} icon="Hashtag" label="Tag" results={tags.length} />
                </Tabs>
                <TabPage value={1}>
                    <div className={styles.recipes}>
                        {
                            recipes.map((recipe) => (
                                <RecipeRow key={recipe.idRecipe} recipe={recipe} />
                            ))
                        }
                    </div>
                </TabPage>
                <TabPage value={2}>
                    <div className={styles.users}>
                        {
                            users.length > 0 ?
                                users.map((user) => (
                                    <UserRow key={user.username} user={user} />
                                ))
                                :
                                <div className={styles.notFound}>
                                    <Icon.EmojiSad />
                                    <Heading>No results</Heading>
                                </div>
                        }
                    </div>
                </TabPage>
                <TabPage value={3}>
                    <div className={styles.tags}>
                        {tags.map(tag => (
                            <div className={styles.tag} key={tag.name}>
                                <Heading variant='h5'>{tag.name}</Heading>
                                <small>{tag.recipes.length} {tag.recipes.length > 1 ? 'recipes' : 'recipe'}</small>
                            </div>
                        ))}
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
        const tags: Tag[] = [];
        data.search.forEach((result) => {
            if (result.__typename === "User") {
                users.push(result as User);
            } else if (result.__typename === "Recipe") {
                recipes.push(result as Recipe);
            } else if (result.__typename === "Tag") {
                tags.push(result as Tag);
            }
        });
        return {
            props: {
                users,
                recipes,
                tags
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
