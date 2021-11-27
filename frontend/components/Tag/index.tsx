import styles from '@sass/components/tag.module.scss'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
    title: string
}

const Tag = ({ title, className = "", ...rest }: Props) => {
    return (
        <div className={`${styles.tag} ${className}`} {...rest}>
            {title}
        </div>
    )
}

export default Tag
