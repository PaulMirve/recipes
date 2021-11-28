import styles from '@sass/components/list-item.module.scss'
import Icon from 'components/Icon'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
    text?: string,
    bullet?: boolean,
    onDelete?: () => void,
    onEdit?: () => void
}

export const ListItem = ({ bullet, text, children, className = "", onEdit, onDelete, ...rest }: Props) => {
    return (
        <div className={styles.wrapper}>
            {bullet && <div className={styles.bullet}></div>}
            <div className={`${styles.listItem} ${className}`} {...rest}>
                {text ? text : children}
                <div className={styles.actions}>
                    <Icon.Delete />
                    <Icon.Edit />
                </div>
            </div>
        </div>
    )
}
