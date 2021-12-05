import styles from '@sass/components/recipe-row.module.scss'
import Heading from 'components/Heading';
import Paragraph from 'components/Paragraph';
import Tag from 'components/Tag';
import { Recipe } from 'generated/graphql';
import { useRouter } from 'next/dist/client/router';

interface Props {
    recipe: Recipe
}

const RecipeRow = ({ recipe }: Props) => {
    const { name, description, tags, idRecipe } = recipe;
    const router = useRouter();

    return (
        <div onClick={() => router.push(`/recipes/${idRecipe}`)} className={styles.main}>
            <Heading>{name}</Heading>
            <Paragraph>{description}</Paragraph>
            <div className={styles.tags}>
                {
                    tags.map(tag => (
                        <Tag key={tag.name} title={tag.name} />
                    ))
                }
            </div>
        </div>
    )
}

export default RecipeRow;