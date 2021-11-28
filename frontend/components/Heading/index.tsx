import styles from '@sass/components/heading.module.scss'
import { ComponentPropsWithoutRef } from 'react'
interface Props extends ComponentPropsWithoutRef<'h1'> {
    variant?: 'h1' | 'h2' | 'h3' | 'h5',
    fontWeight?: 'regular' | 'bold' | 'semi-bold' | 'medium',
    fontFamily?: 'body' | 'headings',
    centered?: boolean
}

const Heading = ({ fontFamily, children, centered, fontWeight, variant, className = "", ...rest }: Props) => {
    const getFontFamily = () => {
        switch (fontFamily) {
            case 'body':
                return styles.fontBody;
            default:
                return "";
        }
    }

    const getVariant = () => {
        switch (variant) {
            case 'h1':
                return styles.h1;
            case 'h2':
                return styles.h2;
            case "h5":
                return styles.h5;
            default:
                return styles.h3;
        }
    }

    const getFontWeight = () => {
        switch (fontWeight) {
            case 'bold':
                return styles.bold;
            case 'semi-bold':
                return styles.semiBold;
            case 'medium':
                return styles.medium;
            default:
                return "";
        }
    }

    return (
        <h1 className={`${styles.heading} ${getVariant()} ${getFontFamily()} ${centered ? "tac" : ""} ${getFontWeight()} ${className}`} {...rest}>
            {children}
        </h1>
    )
}

export default Heading
