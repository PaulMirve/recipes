import styles from '@sass/pages/add-recipe.module.scss'
import axios from 'axios'
import { FloatingButton } from 'components/FloatingButton'
import Heading from 'components/Heading'
import Icon from 'components/Icon'
import TagInput from 'components/TagInput'
import { FormikTextArea } from 'components/TextArea/FormikTextArea'
import { FormikTextInput } from 'components/TextInput'
import { Form, Formik } from 'formik'
import { Ingredient, Step, useGetUnitsQuery } from 'generated/graphql'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as Yup from 'yup'
import { IngredientsForm } from './IngredientsForm'
import { StepsForms } from './StepsForms'

const MySwal = withReactContent(Swal);

interface Props {
    tags?: string[],
    ingredients?: Ingredient[],
    steps?: Step[]
}

const RecipeForm = ({ tags: _tags = [], ingredients: _ingredients = [], steps: _steps = [] }: Props) => {
    const router = useRouter();
    const [photo, setPhoto] = useState<string | undefined>();
    const [photoFile, setPhotoFile] = useState<Blob>()
    const [tags, setTags] = useState<string[]>(_tags)
    const [ingredients, setIngredients] = useState<Ingredient[]>(_ingredients)
    const [steps, setSteps] = useState<Step[]>(_steps)

    const { data } = useGetUnitsQuery();

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
        Swal.fire({
            title: 'Loading...',
            customClass: {
                popup: styles.alert
            },
            allowOutsideClick: false
        });
        Swal.showLoading();
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
                await axios.post('http://localhost:8081/graphql', formData, {
                    headers: {
                        authorization: localStorage.getItem('token') || ""
                    }
                });
                Swal.hideLoading();
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
                Swal.hideLoading();
                alert(err);
            }

        } else {
            Swal.hideLoading();
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
            <IngredientsForm setIngredients={setIngredients} ingredients={ingredients} units={data?.getUnits ? data.getUnits : []} />
            <Heading className="mt-sm" variant='h5' fontWeight='medium' fontFamily='body'>Steps</Heading>
            <StepsForms steps={steps} setSteps={setSteps} />
        </div>
    )
}

export default RecipeForm
