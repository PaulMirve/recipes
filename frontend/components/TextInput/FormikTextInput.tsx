import styles from '@sass/components/text-input.module.scss'
import { ErrorMessage, FieldHookConfig, useField } from 'formik'
import { ComponentPropsWithoutRef } from 'react'
import { TextInput } from './TextInput'

interface Props extends ComponentPropsWithoutRef<'input'> {
    label?: string,
    fullWidth?: boolean,
}

export const FormikTextInput = ({ ...props }: Props & FieldHookConfig<string>) => {
    const [field] = useField(props)
    return (
        <>
            <TextInput {...field} {...props} />
            <ErrorMessage className={styles.error} name={props.name} component="span" />
        </>
    )
}

