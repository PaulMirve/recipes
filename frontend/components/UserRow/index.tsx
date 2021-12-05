import styles from '@sass/components/user-row.module.scss'
import Avatar from 'components/Avatar';
import Heading from 'components/Heading';
import Icon from 'components/Icon';
import Paragraph from 'components/Paragraph';
import { User } from 'generated/graphql'
import { useRouter } from 'next/dist/client/router';

interface Props {
    user: User
}

const UserRow = ({ user }: Props) => {
    const { username, name, lastName, followers, following } = user;
    const router = useRouter();

    return (
        <div onClick={() => router.push(`/user/${username}`)} className={styles.main}>
            <Avatar style={{width: '10rem', fontSize: '3.8rem'}} name={`${name} ${lastName}`} />
            <span>
                <Heading>{username}</Heading>
                <Paragraph>{name} {lastName}</Paragraph>
                <div className={styles.metadata}>
                    <span className={styles.follow}>
                        <Icon.People />
                        <span>{followers.length} followers</span>
                    </span>
                    <span className={styles.follow}>
                        <Icon.PeopleOutline />
                        <span>{following.length} following</span>
                    </span>
                </div>
            </span>
        </div>
    )
}

export default UserRow
