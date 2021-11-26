import styles from '@sass/components/button.module.scss'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'button'> {
    variant?: 'primary' | 'secondary'
}

const Button = ({ children, variant, ...rest }: Props) => {
    const getVariant = () => {
        switch (variant) {
            case 'secondary':
                return styles['button--secondary'];
            default: {
                return "";
            }
        }
    }
    return (
        <button className={`${styles.button} ${getVariant()}`} {...rest}>
            {children}
        </button>
    )
}

export default Button
