import { ComponentPropsWithoutRef } from "react"
import styles from '@sass/components/checkbox.module.scss'
import Icon from "components/Icon"

interface Props extends ComponentPropsWithoutRef<'input'> {
    name: string,
    label: string
}

const Checkbox = ({ name, type, label, ...props }: Props) => {
    return (
        <div className={styles.wrapper}>
            <input className={styles.checkbox} id={name} type="checkbox" name={name} {...props} />
            <label className={styles.label} htmlFor={name}>
                <Icon.Check className={styles.check} />
            </label>
            <span>{label}</span>
        </div>
    )
}

export default Checkbox
