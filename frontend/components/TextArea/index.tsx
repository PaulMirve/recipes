import { ComponentPropsWithoutRef } from 'react'
import styles from '@sass/components/text-area.module.scss'

interface Props extends ComponentPropsWithoutRef<'textarea'> {
    label?: string
}

const TextArea = ({ label, className = "", ...rest }: Props) => {
    return (
        <div className={styles.wrapper}>
            {label && <label className={styles.label}>{label}:</label>}
            <textarea className={`${styles.textarea} ${className}`} {...rest}></textarea>
        </div>
    )
}

export default TextArea
