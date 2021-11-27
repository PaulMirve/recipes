import styles from '@sass/components/recipe-card.module.scss'
import { Recipe } from 'generated/graphql'
import { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import Heading from 'components/Heading'
import { useRouter } from 'next/dist/client/router'
import Tag from 'components/Tag'

interface Props extends ComponentPropsWithoutRef<'div'> {
    recipe: Recipe
}

const RecipeCard = ({ className = "", recipe, onClick, ...rest }: Props) => {
    const { idRecipe, name, description, tags, photo, user: { username } } = recipe;
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/recipes/${idRecipe}`)}
            className={`${styles.card} ${className}`}
            {...rest}>
            <div className={styles.username}>{username}</div>
            <Image src={photo} width={400} height={400} className={styles.photo} />
            <div className={styles.content}>
                <p className={styles.name}>{name}</p>
                <p className={styles.description}>{description}</p>
                <div className={styles.tags}>
                    {
                        tags.map(({ name }) => <Tag key={name} title={name} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default RecipeCard
