import styles from '@sass/pages/add-recipe.module.scss'
import Button from 'components/Button'
import { ListItem } from 'components/ListItem'
import { FormikTextArea } from 'components/TextArea/FormikTextArea'
import { Form, Formik } from 'formik'
import { Step } from 'generated/graphql'
import { Dispatch, SetStateAction, useState } from 'react'
import * as Yup from 'yup'

interface Props {
    steps: Step[],
    setSteps: Dispatch<SetStateAction<Step[]>>
}

export const StepsForms = ({ steps, setSteps }: Props) => {
    const [stepsInitialValues, setStepsInitialValues] = useState({
        description: ''
    })
    const [updateSteps, setUpdateSteps] = useState<boolean>(false)
    const [selectedStep, setSelectedStep] = useState<Step | null>(null)

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

    return (
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
    )
}
