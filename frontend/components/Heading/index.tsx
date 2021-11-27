import styles from '@sass/components/heading.module.scss'
import { ComponentPropsWithoutRef } from 'react'
interface Props extends ComponentPropsWithoutRef<'h1'> {
    variant?: 'h1' | 'h2' | 'h3',
    fontWeight?: 'regular' | 'bold',
    centered?: boolean
}

const Heading = ({ children, centered, fontWeight, variant, className = "", ...rest }: Props) => {
    const getVariant = () => {
        switch (variant) {
            case 'h1':
                return styles.h1;
            case 'h2':
                return styles.h2;
            default:
                return styles.h3;
        }
    }

    const getFontWeight = () => {
        switch (fontWeight) {
            case 'bold':
                return styles.bold;
            default:
                return "";
        }
    }

    return (
        <h1 className={`${styles.heading} ${getVariant()} ${centered ? "tac" : ""} ${getFontWeight()} ${className}`} {...rest}>
            {children}
        </h1>
    )
}

export default Heading
