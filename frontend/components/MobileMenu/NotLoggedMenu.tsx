import styles from '@sass/components/mobile-menu.module.scss'
import Icon from 'components/Icon'
import Link from 'next/link'

const NotLoggedMenu = () => {
    return (
        <div>
            <div className={styles.links}>
                <span className={styles.link}>
                    <Icon.Login />
                    <Link href="/login"><a>Login</a></Link>
                </span>
                <span className={styles.link}>
                    <Icon.Edit />
                    <Link href="/"><a>Sign In</a></Link>
                </span>
            </div>
        </div>
    )
}

export default NotLoggedMenu
