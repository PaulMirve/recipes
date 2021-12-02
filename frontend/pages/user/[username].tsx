import styles from '@sass/pages/user-detail.module.scss'
import client from 'client'
import Heading from 'components/Heading'
import { GetUserQuery, GetUserQueryVariables, User } from 'generated/graphql'
import { getUserQuery } from 'graphql/user.resolver'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Avatar from 'components/Avatar'
import Icon from 'components/Icon'

interface Props {
    user: User
}

const UserDetails = ({ user }: Props) => {
    const { username, name, lastName, followers, following } = user;
    return (
        <div className={styles.main}>
            <div className={styles.box}>
                <Avatar className={styles.avatar} name={`${name} ${lastName}`} />
            </div>
            <div className={styles.metadata}>
                <span className={styles.username}>
                    <Heading fontWeight="bold" >{username}</Heading>
                    <div>Follow <Icon.PersonAddOutline /></div>
                </span>
                <span><p>{followers.length}</p> followers <Icon.People /></span>
                <span><p>{following.length} following </p><Icon.PeopleOutline /></span>
            </div>
        </div>
    )
}

interface Params extends ParsedUrlQuery {
    username: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
    const { username } = params!;
    const { data } = await client.query<GetUserQuery, GetUserQueryVariables>({
        query: getUserQuery,
        variables: {
            username
        },
        fetchPolicy: 'no-cache'
    });
    return {
        props: {
            user: data.getUser as User
        }
    }
}

export default UserDetails
