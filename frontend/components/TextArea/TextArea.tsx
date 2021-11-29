import { ComponentPropsWithoutRef } from 'react'
import styles from '@sass/components/text-area.module.scss'

export interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
    label?: string,
    name: string
}

export const TextArea = ({ label, className = "", ...rest }: TextAreaProps) => {
    return (
        <div className={styles.wrapper}>
            {label && <label className={styles.label}>{label}:</label>}
            <textarea className={`${styles.textarea} ${className}`} {...rest}></textarea>
        </div>
    )
}
