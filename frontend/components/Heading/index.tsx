import styles from '@sass/components/heading.module.scss'
import { ComponentPropsWithoutRef } from 'react'
interface Props extends ComponentPropsWithoutRef<'h1'> {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
    fontWeight?: 'regular' | 'bold' | 'semi-bold' | 'medium',
    fontFamily?: 'body' | 'headings',
    centered?: boolean,
    casing?: 'default' | 'uppercase'
}

const Heading = ({ fontFamily, children, centered, fontWeight, variant, className = "", casing, ...rest }: Props) => {
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
            case 'h3':
                return styles.h3;
            case 'h4':
                return styles.h4;
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
        <h1
            className={`${styles.heading} ${getVariant()} ${getFontFamily()} ${centered ? "tac" : ""} ${getFontWeight()} ${casing === "uppercase" && styles.uppercase} ${className}`}
            {...rest}>
            {children}
        </h1>
    )
}

export default Heading
