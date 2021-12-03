import styles from '@sass/pages/user-detail.module.scss'
import client from 'client'
import Heading from 'components/Heading'
import { GetUserQuery, GetUserQueryVariables, User } from 'generated/graphql'
import { getUserQuery } from 'graphql/user.resolver'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Avatar from 'components/Avatar'
import Icon from 'components/Icon'
import RecipeCard from 'components/RecipeCard'
import { useFollow } from 'hooks/useFollow'
import Head from 'next/head'

interface Props {
    user: User
}

const UserDetails = ({ user }: Props) => {
    const { username, name, lastName, followers, following, recipes } = user;
    const { follow, isFollowed, isMe } = useFollow({ username, followers });
    return (
        <div className={styles.main}>
            <Head>
                <title>ReciPies | {username}</title>
            </Head>
            <div className={styles.box}>
                <Avatar className={styles.avatar} name={`${name} ${lastName}`} />
            </div>
            <div className={styles.metadataWrapper}>
                <div className={styles.metadata}>
                    <span className={`${styles.username} ${isMe && styles.usernameCentered}`}>
                        <Heading fontWeight="bold" >{username}</Heading>
                        {!isMe &&
                            <>
                                {
                                    isFollowed ?
                                        <div onClick={follow} className={styles.follow}>Unfollow <Icon.PersonAddOutline /></div>
                                        :
                                        <div onClick={follow} className={styles.follow}>Follow <Icon.PersonAddOutline /></div>
                                }

                            </>
                        }
                    </span>
                    <span className={styles.followers}><p>{followers.length}</p> followers <Icon.People /></span>
                    <span className={styles.following}><p>{following.length} following </p><Icon.PeopleOutline /></span>
                </div>
            </div>
            <div className={styles.recipes}>
                {
                    recipes.map((recipe) => (
                        <RecipeCard key={recipe.idRecipe} showUsername={false} recipe={recipe} />
                    ))
                }
            </div>
        </div>
    )
}

interface Params extends ParsedUrlQuery {
    username: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
    const { username } = params!;
    const user = await client.query<GetUserQuery, GetUserQueryVariables>({
        query: getUserQuery,
        variables: {
            username
        },
        fetchPolicy: 'no-cache'
    })
        .then(res => res.data.getUser as User)
        .catch(err => null)
    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: '/404'
            }
        }
    }
    return {
        props: {
            user
        }
    }
}

export default UserDetails
