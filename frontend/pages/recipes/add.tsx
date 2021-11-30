import styles from '@sass/pages/add-recipe.module.scss'
import client from 'client'
import Button from 'components/Button'
import { FloatingButton } from 'components/FloatingButton'
import Heading from 'components/Heading'
import Icon from 'components/Icon'
import { ListItem } from 'components/ListItem'
import { FormikSelect } from 'components/Select'
import { FormikTextArea } from 'components/TextArea/FormikTextArea'
import { FormikTextInput, TextInput } from 'components/TextInput'
import { Form, Formik } from 'formik'
import { GetUnitsQuery, Ingredient, Step, Unit } from 'generated/graphql'
import { getUnits } from 'graphql/unit.resolver'
import _ from 'lodash'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/dist/client/router'
import TagInput from 'components/TagInput'
import axios from 'axios';

const MySwal = withReactContent(Swal);

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
    const router = useRouter();
    const [photo, setPhoto] = useState<string | undefined>();
    const [photoFile, setPhotoFile] = useState<Blob>()
    const [tags, setTags] = useState<string[]>([])
    const [ingredientsInitialValues, setIngredientsInitialValues] = useState({
        name: '',
        quantity: 0,
        idUnit: 0
    })
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null)
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [updateIngredients, setUpdateIngredients] = useState<boolean>(false)
    const [stepsInitialValues, setStepsInitialValues] = useState({
        description: ''
    })
    const [steps, setSteps] = useState<Step[]>([])
    const [updateSteps, setUpdateSteps] = useState<boolean>(false)
    const [selectedStep, setSelectedStep] = useState<Step | null>(null)

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

    const onStepDelete = (index: number) => {
        const _steps = [...steps];
        _steps.splice(index, 1);
        setSteps(_steps);
    }

    const onStepUpdate = (step: Step) => {
        setUpdateSteps(true);
        setSelectedStep(step);
        setStepsInitialValues({
            description: step.description
        });
    }

    const handlePhotoSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            try {
                const url = URL.createObjectURL(event.target.files[0]);
                setPhotoFile(event.target.files[0]);
                setPhoto(url);
            } catch { }
        }
    }

    const onFormSubmit = async ({ name, people, description }: {
        name: string;
        people: number;
        description: string;
    }) => {
        const errors = [];
        if (!photo) {
            errors.push('The recipe needs a photo.');
        }
        if (steps.length === 0) {
            errors.push('The recipe needs one or more steps.');
        }
        if (ingredients.length === 0) {
            errors.push('The recipe needs one or more ingredients.');
        }
        if (tags.length === 0) {
            errors.push('The recipe needs one or more tags.');
        }

        if (errors.length === 0) {
            let formData = new FormData();
            formData.append("operations", `
            {
                "query": "mutation ($recipe: RecipeInput!) {saveRecipe(recipe: $recipe){name} }",
                "variables": {
                    "recipe": {
                        "name": "${name}",
                        "description": "${description}",
                        "photo": null,
                        "numberOfPeople": ${people},
                        "ingredients": [${ingredients.map(({ name, quantity, unit: { idUnit } }) => JSON.stringify({ name, quantity: Number(quantity), idUnit: Number(idUnit) }))}],
                        "steps": [${steps.map(({ description }) => JSON.stringify({ description }))}],
                        "tags": [${tags.map((tag) => JSON.stringify({ name: tag, idRecipe: 0 }))}]
                    }
                }
            }
            `);
            formData.append("map", `{ "0": ["variables.recipe.photo"] }`);
            formData.append("0", photoFile!);
            try {
                const { data } = await axios.post('http://localhost:8081/graphql', formData, {
                    headers: {
                        authorization: localStorage.getItem('token') || ""
                    }
                });
                MySwal.fire({
                    title: 'Recipe added successfully!',
                    text: 'The recipe has been added successfully, please press continue to see the recipes.',
                    icon: 'success',
                    allowOutsideClick: false,
                    customClass: {
                        popup: styles.alert
                    },
                    confirmButtonText: 'Continue'
                }).then(result => {
                    if (result.isConfirmed) {
                        router.push('/recipes');
                    }
                })
            } catch (err) {
                alert(err);
            }

        } else {
            MySwal.fire({
                title: 'Recipe incomplete!',
                html: (
                    <span>
                        <h4 style={{ marginBottom: '1rem' }}>The information of the recipe is incomplete:</h4>
                        <ul>
                            {
                                errors.map(error => (
                                    <li className={styles.errors}>{error}</li>
                                ))
                            }
                        </ul>
                    </span>
                ),
                icon: 'error',
                allowOutsideClick: false,
                customClass: {
                    popup: styles.alert
                },
                confirmButtonText: 'Accept'
            })
        }
    }

    return (
        <div className={styles.main}>
            <Heading variant="h1" fontWeight='bold'>Add new recipe</Heading>
            <Formik
                initialValues={{
                    name: '',
                    people: 1,
                    description: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('The name of the recipe is required'),
                    people: Yup.number().min(1, 'The recipe can not be for less than one people'),
                    description: Yup.string().required('The description of the recipe is required')
                })}
                onSubmit={onFormSubmit}>
                {
                    formik => (
                        <Form>
                            <div className={styles.info}>
                                <div className={styles.frame}>
                                    <div className={styles.addPhoto}>
                                        <span>
                                            <label htmlFor="file">
                                                <Icon.Plus />
                                                <p className="tac">Add photo</p>
                                            </label>
                                            <input onChange={handlePhotoSelection} type="file" id="file" />
                                        </span>
                                    </div>
                                    {photo ? <img src={photo} alt="Selected photo" className={styles.photo} /> : <Icon.Photograph />}
                                </div>
                                <div>
                                    <FormikTextInput name="name" label="Recipe name" />
                                    <div className={styles.doubleGrid}>
                                        <FormikTextInput name="people" label="Number of people" />
                                        <TagInput tags={tags} onChange={tags => setTags(tags)} />
                                    </div>
                                    <FormikTextArea name="description" label="Description" cols={30} rows={10}></FormikTextArea>
                                </div>
                            </div>

                            <FloatingButton type="submit" tooltip="Add new recipe">
                                <Icon.Plus />
                            </FloatingButton>
                        </Form>
                    )
                }
            </Formik>
            <Heading className="mt-sm" variant='h5' fontWeight='medium' fontFamily='body'>Ingredients</Heading>
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
            <Heading className="mt-sm" variant='h5' fontWeight='medium' fontFamily='body'>Steps</Heading>
            <div className={styles.steps}>
                <div className={styles.steps__form}>
                    <Formik
                        initialValues={stepsInitialValues}
                        validationSchema={Yup.object({
                            description: Yup.string().required('A step description is required')
                        })}
                        onSubmit={({ description }, { resetForm }) => {
                            if (!updateSteps) {
                                setSteps(prev => [...prev, { description }]);
                            } else {
                                const _steps = [...steps];
                                const stepIndex = steps.indexOf(selectedStep!);
                                _steps[stepIndex] = { description };
                                setSteps(_steps);
                                setStepsInitialValues({
                                    description: ''
                                });
                                setUpdateSteps(false);
                                setSelectedStep(null);
                            }
                            resetForm();
                        }}
                        enableReinitialize>
                        {
                            formik => (
                                <Form>
                                    <FormikTextArea name="description" label="Step" placeholder="Write the steps for your recipe" rows={10} />
                                    <Button type="submit" fullWidth className="mt-sm">Add step</Button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
                <div className={styles.steps__list}>
                    {
                        steps.map((step, index) => (
                            <ListItem key={index} bullet onDelete={() => onStepDelete(index)} onEdit={() => onStepUpdate(step)} text={step.description} />
                        ))
                    }
                </div>
            </div>
            {/* <FloatingButton onClick={() => {
                MySwal.fire({
                    title: 'Recipe added successfully!',
                    text: 'The recipe has been added successfully, please press continue to see the recipes.',
                    icon: 'success',
                    allowOutsideClick: false,
                    customClass: {
                        popup: styles.alert
                    },
                    confirmButtonText: 'Continue',
                    willClose() {
                        router.push('/recipes');
                    }
                })
                // MySwal.fire({
                //     title: 'Something happened!',
                //     text: 'The next fields need to be filled.',
                //     icon: 'error',
                //     allowOutsideClick: false,
                //     customClass: {
                //         popup: styles.alert
                //     },
                //     confirmButtonText: 'Accept'
                // })
            }} tooltip="Add new recipe">
                <Icon.Plus />
            </FloatingButton> */}
        </div>
    )
}

export default AddRecipe
