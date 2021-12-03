import styles from '@sass/components/mobile-menu.module.scss'
import Avatar from 'components/Avatar'
import Icon from 'components/Icon'
import { User } from 'generated/graphql'
import { randomRecipe } from 'helpers/random-recipe'
import { useGlobalContext } from 'hooks/useGlobalContext'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

interface Props {
    user: User
}

const LoggedMenu = ({ user }: Props) => {
    const { name, lastName, username } = user;
    const router = useRouter();
    const { logout } = useGlobalContext();
    return (
        <div>
            <div className={styles.userInfo}>
                <Avatar name={`${name} ${lastName}`} />
                <span>
                    <b>{username}</b>
                    <p>{name} {lastName}</p>
                </span>
            </div>
            <hr className="mt-sm" />
            <div className={styles.links}>
                <span className={styles.link}>
                    <Icon.PlusCircle />
                    <Link href='/recipes/add'>
                        <a>Add Recipe</a>
                    </Link>
                </span>
                <span className={styles.link}>
                    <Icon.BookOpen />
                    <Link href='/recipes'>
                        <a>Recipes</a>
                    </Link>
                </span>
                <span className={styles.link}>
                    <Icon.InformationCircle />
                    <Link href='/'>
                        <a>About</a>
                    </Link>
                </span>
                <span onClick={() => randomRecipe(router)} className={styles.link}>
                    <Icon.Eye />
                    Discover
                </span>
                <span onClick={logout} className={styles.link}>
                    <Icon.Logout />
                    Logout
                </span>
            </div>

        </div>
    )
}

export default LoggedMenu
