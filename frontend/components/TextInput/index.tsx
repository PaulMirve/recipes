import styles from '@sass/components/text-input.module.scss'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'input'> {
    label?: string,
    fullWidth?: boolean
}

const TextInput = ({ label, className = "", fullWidth, ...rest }: Props) => {
    return (
        <div className={`${styles.wrapper} ${className} ${fullWidth ? "fullwidth" : ''}`}>
            {label && <label className={styles.label}>{label}:</label>}
            <input type="text" className={styles.textInput} {...rest} />
        </div>
    )
}

export default TextInput
