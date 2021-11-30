import styles from '@sass/pages/add-recipe.module.scss'
import Button from 'components/Button'
import { ListItem } from 'components/ListItem'
import { FormikSelect } from 'components/Select'
import { FormikTextInput } from 'components/TextInput'
import { Form, Formik } from 'formik'
import { Ingredient, Unit } from 'generated/graphql'
import { Dispatch, SetStateAction, useState } from 'react'
import * as Yup from 'yup'

interface Props {
    ingredients: Ingredient[],
    setIngredients: Dispatch<SetStateAction<Ingredient[]>>,
    units: Unit[]
}

export const IngredientsForm = ({ ingredients, setIngredients, units }: Props) => {
    const [ingredientsInitialValues, setIngredientsInitialValues] = useState({
        name: '',
        quantity: 0,
        idUnit: 0
    })
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null)
    const [updateIngredients, setUpdateIngredients] = useState<boolean>(false)

    const onIngredientDelete = (index: number) => {
        const _ingredients = [...ingredients];
        _ingredients.splice(index, 1);
        setIngredients(_ingredients);
    }

    const onIngredientUpdate = (ingredient: Ingredient) => {
        const { name, quantity, unit: { idUnit } } = ingredient;
        setUpdateIngredients(true);
        setSelectedIngredient(ingredient);
        setIngredientsInitialValues({
            name,
            quantity,
            idUnit: Number(idUnit)
        });
    }

    return (
        <div className={styles.ingredients}>
            <div className={styles.ingredients__form}>
                <Formik
                    initialValues={ingredientsInitialValues}
                    onSubmit={({ name, quantity, idUnit }, { resetForm }) => {
                        const unit = units.find(u => u.idUnit === idUnit.toString())!;
                        if (!updateIngredients) {
                            setIngredients(prev => [...prev, { name, quantity, unit }]);
                        } else {
                            const ingredientIndex = ingredients.indexOf(selectedIngredient!);
                            const _ingredients = [...ingredients];
                            _ingredients[ingredientIndex] = { name, quantity, unit };
                            setIngredients(_ingredients);
                            setIngredientsInitialValues({
                                name: '',
                                quantity: 0,
                                idUnit: 0
                            });
                            setUpdateIngredients(false);
                            setSelectedIngredient(null);
                        }
                        resetForm();
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('The ingredient name is required'),
                        quantity: Yup.number().required('The ingredient is required').min(1, 'The quantity has to be greater than 0'),
                        idUnit: Yup.number().notOneOf([0], 'Please select a unit').required('Please select a unit')
                    })}
                    enableReinitialize>
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
                        <ListItem onDelete={() => onIngredientDelete(index)} onEdit={() => onIngredientUpdate(ingredient)} key={index}>
                            <span className={styles.ingredient}>
                                {ingredient.name}
                                <b>{ingredient.quantity} {ingredient.unit.name}</b>
                            </span>
                        </ListItem>
                    ))
                }
            </div>
        </div>
    )
}
