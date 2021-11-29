import { ErrorMessage, FieldHookConfig, useField } from 'formik'
import React from 'react'
import { Select } from '.'
import styles from '@sass/components/text-input.module.scss'
import { SelectProps } from './Select'



export const FormikSelect = (props: SelectProps & FieldHookConfig<string>) => {
    const [field] = useField(props)

    return (
        <>
            <Select {...props} {...field} />
            <ErrorMessage className={styles.error} name={props.name} component="span" />
        </>
    )
}
