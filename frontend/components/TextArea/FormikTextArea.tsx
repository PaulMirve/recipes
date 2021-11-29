import styles from '@sass/components/text-area.module.scss'
import { ErrorMessage, FieldHookConfig, useField } from 'formik'
import { TextArea } from '.'
import { TextAreaProps } from './TextArea'

export const FormikTextArea = (props: TextAreaProps & FieldHookConfig<string>) => {
    const [field] = useField(props);
    return (
        <>
            <TextArea {...props} {...field} />
            <ErrorMessage name={props.name} className={styles.error} component="span" />
        </>
    )
}
