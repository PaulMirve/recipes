import styles from '@sass/components/navbar.module.scss'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import { GlobalContext } from 'context/GlobalContext'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import Icon from 'components/Icon'
import { useContext } from 'react'
import client from 'client'
import { getRecipeIdsQuery } from 'graphql/recipe.resolver'
import { GetRecipeIdsQuery } from 'generated/graphql'


const Navbar = () => {
    const router = useRouter();
    const { user } = useContext(GlobalContext);

    const onDiscover = async () => {
        const { data } = await client.query<GetRecipeIdsQuery>({
            query: getRecipeIdsQuery
        });
        const ids = data.getRecipes;
        const randomIndex = Math.floor(Math.random() * (ids.length));
        router.push(`/recipes/${ids[randomIndex].idRecipe}`)
    }

    return (
        <nav className={styles.navbar}>
            <Link href='/recipes'>
                <a> <Image src='/logo.png' width={120} height={50} /></a>
            </Link>
            <div className={styles.links}>
                <Link href='/recipes'><a>Recipes</a></Link>
                <Link href='/'><a>About</a></Link>
                <span onClick={onDiscover}><a>Discover</a></span>
            </div>
            {
                user ?
                    <div className={`${styles.actions} ${router.pathname.includes('user') && styles.black}`}>
                        <span>
                            <Icon.PlusCircle onClick={() => router.push('/recipes/add')} />
                            <Icon.Bell />
                        </span>
                        <Avatar className={`${styles.avatar} ${styles.avatarBlack}`} name={`${user.name} ${user.lastName}`} />
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
