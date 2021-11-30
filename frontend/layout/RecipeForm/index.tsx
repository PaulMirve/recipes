import styles from '@sass/pages/add-recipe.module.scss'
import { FloatingButton } from 'components/FloatingButton'
import Heading from 'components/Heading'
import Icon from 'components/Icon'
import TagInput from 'components/TagInput'
import { FormikTextArea } from 'components/TextArea/FormikTextArea'
import { FormikTextInput } from 'components/TextInput'
import { Form, Formik } from 'formik'
import { Ingredient, Step, useGetUnitsQuery } from 'generated/graphql'
import { useState } from 'react'
import * as Yup from 'yup'
import { IngredientsForm } from './IngredientsForm'
import { StepsForms } from './StepsForms'



export interface RecipeFormSubmitArgs {
    name: string,
    people: number,
    description: string,
    photo: string | undefined,
    photoFile: Blob | undefined,
    steps: Step[],
    ingredients: Ingredient[],
    tags: string[]
}

interface Props {
    tags?: string[],
    ingredients?: Ingredient[],
    steps?: Step[],
    onFormSubmit: (args: RecipeFormSubmitArgs) => void
}

const RecipeForm = ({ tags: _tags = [], ingredients: _ingredients = [], steps: _steps = [], onFormSubmit }: Props) => {

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
                onSubmit={({ name, description, people }) => onFormSubmit({ name, people, description, photo, photoFile, steps, ingredients, tags })}>
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
