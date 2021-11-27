import styles from '@sass/components/navbar.module.scss'
import Button from 'components/Button'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    const router = useRouter();

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
            <div className={styles.actions}>
                <Link href='/login'><a>Login</a></Link>
                <Button onClick={() => router.push('/singup')}>Sign Up</Button>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.menu} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </nav>
    )
}

export default Navbar
