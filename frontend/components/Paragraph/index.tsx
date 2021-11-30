import React, { ComponentPropsWithoutRef } from 'react'
import styles from '@sass/components/paragraph.module.scss'

interface Props extends ComponentPropsWithoutRef<'p'> {

}

const Paragraph = ({ className = "", children, ...props }: Props) => {
    return (
        <p className={`${styles.paragraph} ${className}`} {...props}>
            {children}
        </p>
    )
}

export default Paragraph
