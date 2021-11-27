import React, { ComponentPropsWithoutRef } from 'react'
import styles from '@sass/components/form.module.scss'

interface Props extends ComponentPropsWithoutRef<'form'> {

}

const Form = ({ children, className = "", ...rest }: Props) => {
    return (
        <form className={`${styles.form} ${className}`} {...rest}>
            {children}
        </form>
    )
}

export default Form
