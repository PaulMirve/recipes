import styles from '@sass/components/button.module.scss'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'button'> {
    variant?: 'primary' | 'dark' | 'light',
    fullWidth?: boolean
}

const Button = ({ children, variant, className = "", fullWidth, ...rest }: Props) => {
    const getVariant = () => {
        switch (variant) {
            case 'dark':
                return styles.dark;
            case 'light':
                return styles.light;
            default: {
                return "";
            }
        }
    }
    return (
        <button className={`${styles.button} ${getVariant()} ${className} ${fullWidth ? "fullwidth" : ''}`} {...rest}>
            {children}
        </button>
    )
}

export default Button
