import styles from '@sass/pages/add-recipe.module.scss'
import Button from 'components/Button'
import { FloatingButton } from 'components/FloatingButton'
import Heading from 'components/Heading'
import Icon from 'components/Icon'
import { ListItem } from 'components/ListItem'
import TextArea from 'components/TextArea'
import TextInput from 'components/TextInput'

const AddRecipe = () => {
    return (
        <div className={styles.main}>
            <Heading variant="h1" fontWeight='bold'>Add new recipe</Heading>
            <div className={styles.info}>
                <div className={styles.frame}>
                    <div className={styles.addPhoto}>
                        <span>
                            <Icon.Plus />
                            <p className="tac">Add photo</p>
                        </span>
                    </div>
                    <Icon.Photograph />
                </div>
                <div>
                    <TextInput label="Recipe name" />
                    <div className={styles.doubleGrid}>
                        <TextInput label="Number of people" />
                        <TextInput label="Tags" />
                    </div>
                    <TextArea label="Description" cols={30} rows={10}></TextArea>
                </div>
            </div>
            <Heading className="mt-sm" variant='h5' fontWeight='medium' fontFamily='body'>Ingredients</Heading>
            <div className={styles.ingredients}>
                <div className={styles.ingredients__form}>
                    <TextInput label="Name" />
                    <TextInput label="Quantity" />
                    <TextInput label="Unit" />
                    <Button fullWidth className="mt-sm">Add ingredient</Button>
                </div>
                <div className={styles.ingredients__list}>
                    <ListItem>
                        <span className={styles.ingredient}>
                            Potato
                            <b>5 piece(s)</b>
                        </span>
                    </ListItem>
                    <ListItem>
                        <span className={styles.ingredient}>
                            Potato
                            <b>5 piece(s)</b>
                        </span>
                    </ListItem>
                    <ListItem>
                        <span className={styles.ingredient}>
                            Potato
                            <b>5 piece(s)</b>
                        </span>
                    </ListItem>
                    <ListItem>
                        <span className={styles.ingredient}>
                            Potato
                            <b>5 piece(s)</b>
                        </span>
                    </ListItem>
                    <ListItem>
                        <span className={styles.ingredient}>
                            Potato
                            <b>5 piece(s)</b>
                        </span>
                    </ListItem>
                    <ListItem>
                        <span className={styles.ingredient}>
                            Potato
                            <b>5 piece(s)</b>
                        </span>
                    </ListItem>
                    <ListItem>
                        <span className={styles.ingredient}>
                            Potato
                            <b>5 piece(s)</b>
                        </span>
                    </ListItem>
                </div>
            </div>
            <Heading className="mt-sm" variant='h5' fontWeight='medium' fontFamily='body'>Steps</Heading>
            <div className={styles.steps}>
                <div className={styles.steps__form}>
                    <TextArea label="Step" placeholder="Write the steps for your recipe" rows={10} />
                    <Button fullWidth className="mt-sm">Add step</Button>
                </div>
                <div className={styles.steps__list}>
                    <ListItem bullet text="Potatoes" />
                    <ListItem bullet text="Carrots" />
                    <ListItem bullet text="Potatoes" />
                    <ListItem bullet text="Carrots" />
                    <ListItem bullet text="Potatoes" />
                    <ListItem bullet text="Carrots" />
                    <ListItem bullet text="Carrots" />
                    <ListItem bullet text="Carrots" />
                    <ListItem bullet text="Carrots" />
                    <ListItem bullet text="Carrots" />
                </div>
            </div>
            <FloatingButton tooltip="Add new recipe">
                <Icon.Plus />
            </FloatingButton>
        </div>
    )
}

export default AddRecipe
