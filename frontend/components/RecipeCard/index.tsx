import styles from '@sass/components/recipe-card.module.scss'
import Tag from 'components/Tag'
import { Recipe } from 'generated/graphql'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
    recipe: Recipe,
    showUsername?: boolean
}

const RecipeCard = ({ className = "", recipe, onClick, showUsername = true, ...rest }: Props) => {
    const { idRecipe, name, description, tags, photo, user: { username } } = recipe;
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/recipes/${idRecipe}`)}
            className={`${styles.card} ${className}`}
            {...rest}>
            {showUsername &&
                <div onClick={e => e.stopPropagation()} className={styles.username}>
                    <Link href={`/user/${username}`}><a>{username}</a></Link>
                </div>
            }
            <Image src={photo} width={400} height={400} className={styles.photo} />
            <div className={styles.content}>
                <p className={styles.name}>{name}</p>
                <p className={styles.description}>{description}</p>
                <div className={styles.tags} onClick={e => e.stopPropagation()}>
                    {
                        tags.map(({ name }) => <Tag link key={name} title={name} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default RecipeCard
 