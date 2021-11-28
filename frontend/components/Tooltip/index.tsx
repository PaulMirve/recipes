import React, { ComponentPropsWithoutRef } from 'react'
import styles from '@sass/components/tooltip.module.scss'

interface Props extends ComponentPropsWithoutRef<'div'> {
    text: string
}

const Tooltip = ({ className = "", children, text, ...rest }: Props) => {
    return (
        <div className={`${styles.wrapper} ${className}`} {...rest}>
            <div className={`${styles.tooltip}`}>{text}</div>
            {children}
        </div>
    )
}

export default Tooltip
