import styles from '@sass/pages/add-recipe.module.scss'
import client from 'client'
import Button from 'components/Button'
import { FloatingButton } from 'components/FloatingButton'
import Heading from 'components/Heading'
import Icon from 'components/Icon'
import { ListItem } from 'components/ListItem'
import { FormikSelect } from 'components/Select'
import TextArea from 'components/TextArea'
import { FormikTextInput, TextInput } from 'components/TextInput'
import { Form, Formik } from 'formik'
import { GetUnitsQuery, Ingredient, Unit } from 'generated/graphql'
import { getUnits } from 'graphql/unit.resolver'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import * as Yup from 'yup'

interface Props {
    units: Unit[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const { data } = await client.query<GetUnitsQuery>({
        query: getUnits
    });
    return {
        props: {
            units: data.getUnits
        }
    }
}

const AddRecipe = ({ units }: Props) => {

    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    const onIngredientDelete = (index: number) => {
        const _ingredients = [...ingredients];
        _ingredients.splice(index, 1);
        setIngredients(_ingredients);
    }

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
                    <TextInput name="recipeName" label="Recipe name" />
                    <TextInput name="recipeName" label="Recipe name" />
                    <div className={styles.doubleGrid}>
                        <TextInput name="numberOfPeople" label="Number of people" />
                        <TextInput name="tags" label="Tags" />
                    </div>
                    <TextArea label="Description" cols={30} rows={10}></TextArea>
                </div>
            </div>
            <Heading className="mt-sm" variant='h5' fontWeight='medium' fontFamily='body'>Ingredients</Heading>
            <div className={styles.ingredients}>
                <div className={styles.ingredients__form}>
                    <Formik
                        initialValues={{
                            name: '',
                            quantity: 0,
                            idUnit: 0
                        }}
                        onSubmit={({ name, quantity, idUnit }) => {
                            const unit = units.find(u => u.idUnit === idUnit.toString())!;
                            setIngredients(prev => [...prev, { name, quantity, unit }]);
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required('The ingredient name is required'),
                            quantity: Yup.number().required('The ingredient is required').min(1, 'The quantity has to be greater than 0'),
                            idUnit: Yup.number().notOneOf([0], 'Please select a unit').required('Please select a unit')
                        })}>
                        {
                            formik => (
                                <Form>
                                    <FormikTextInput name="name" label="Name" />
                                    <FormikTextInput name="quantity" label="Quantity" />
                                    <FormikSelect label="Unit:" name="idUnit">
                                        <option value={0}>Select a unit</option>
                                        {
                                            units.map(unit => (
                                                <option key={unit.idUnit} value={unit.idUnit}>{unit.name}</option>
                                            ))
                                        }
                                    </FormikSelect>
                                    <Button type="submit" fullWidth className="mt-sm">Add ingredient</Button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                <div className={styles.ingredients__list}>
                    {
                        ingredients.map((ingredient, index) => (
                            <ListItem onDelete={() => onIngredientDelete(index)} key={index}>
                                <span className={styles.ingredient}>
                                    {ingredient.name}
                                    <b>{ingredient.quantity} {ingredient.unit.name}</b>
                                </span>
                            </ListItem>
                        ))
                    }
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
