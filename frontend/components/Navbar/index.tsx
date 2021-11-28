import styles from '@sass/components/navbar.module.scss'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import { GlobalContext } from 'context/GlobalContext'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import Icon from 'components/Icon'
import { useContext } from 'react'


const Navbar = () => {
    const router = useRouter();
    const { user } = useContext(GlobalContext);
    return (
        <nav className={styles.navbar}>
            <Link href='/recipes'>
                <a> <Image src='/logo.png' width={120} height={50} /></a>
            </Link>
            <div className={styles.links}>
                <Link href='/recipes'><a>Recipes</a></Link>
                <Link href='/'><a>About</a></Link>
                <Link href='/'><a>Discover</a></Link>
            </div>
            {
                user ?
                    <div className={styles.actions}>
                        <span>
                            <Icon.PlusCircle onClick={() => router.push('/recipes/add')} />
                            <Icon.Bell />
                        </span>
                        <Avatar className={styles.avatar} name={`${user.name} ${user.lastName}`} />
                    </div>
                    :
                    <div className={styles.actions}>
                        <Link href='/login'><a>Login</a></Link>
                        <Button onClick={() => router.push('/signup')}>Sign Up</Button>
                    </div>
            }
            <Icon.Menu className={styles.menu} />
        </nav>
    )
}

export default Navbar
