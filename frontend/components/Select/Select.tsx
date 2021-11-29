import styles from '@sass/components/select.module.scss'
import { ComponentPropsWithoutRef } from 'react'

export interface SelectProps extends ComponentPropsWithoutRef<'select'> {
    label?: string,
    name: string
}

export const Select = ({ label, className = "", ...props }: SelectProps) => {
    return (
        <div className={styles.wrapper}>
            {label && <label htmlFor={props.name || props.id} className={styles.label}>{label}</label>}
            <select className={`${styles.select} ${className}`} {...props}></select>
        </div>
    )
}
