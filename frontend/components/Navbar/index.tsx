import styles from '@sass/components/navbar.module.scss'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import Icon from 'components/Icon'
import Menu from 'components/Menu/ìndex'
import MobileMenu from 'components/MobileMenu'
import { GlobalContext } from 'context/GlobalContext'
import { randomRecipe } from 'helpers/random-recipe'
import { useGlobalContext } from 'hooks/useGlobalContext'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'


const Navbar = () => {
    const router = useRouter();
    const { user } = useContext(GlobalContext);
    const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const { logout } = useGlobalContext();

    const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
        setIsMenuOpen(true);
    }

    return (
        <nav className={`${styles.navbar} ${router.pathname.includes('login') || router.pathname.includes('signin') ? styles.transparent : ''} ${router.pathname.includes('user') && styles.navbarPrimary}`}>
            <Link href='/recipes'>
                <a> <Image src='/logo.png' width={120} height={50} /></a>
            </Link>
            <div className={styles.links}>
                <Link href='/recipes'><a>Recipes</a></Link>
                <Link href='/'><a>About</a></Link>
                <span onClick={() => randomRecipe(router)}><a>Discover</a></span>
            </div>
            {
                user ?
                    <div className={`${styles.actions} ${router.pathname.includes('user') && styles.black}`}>
                        <span>
                            <Icon.PlusCircle onClick={() => router.push('/recipes/add')} />
                            <Icon.Bell />
                        </span>
                        <Avatar style={{ position: 'relative' }} onClick={handleMenuOpen} className={`${router.pathname.includes('user') && styles.avatarWhite}`} name={`${user.name} ${user.lastName}`} />
                        <Menu onClose={() => setIsMenuOpen(false)} anchorEl={anchorEl} open={isMenuOpen} >
                            <span className={styles.menuIcon}>
                                <Icon.PersonCircleOutline />
                                <Link href={`/user/${user.username}`}><a>Profile</a></Link>
                            </span>
                            <span onClick={logout} className={styles.menuIcon}>
                                <Icon.Logout />
                                Logout
                            </span>
                        </Menu>
                    </div>
                    :
                    <div className={styles.actions}>
                        <Link href='/login'><a>Login</a></Link>
                        <Button
                            variant={router.pathname.includes('user') ? 'dark' : 'primary'}
                            onClick={() => router.push('/signin')}>
                            Sign Up
                        </Button>
                    </div>
            }
            <Icon.Menu onClick={() => setIsOpen(true)} className={styles.menu} />
            <MobileMenu open={isOpen} onClose={() => setIsOpen(false)} />
        </nav>
    )
}

export default Navbar
