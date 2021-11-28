import styles from '@sass/components/floating-button.module.scss'
import Tooltip from 'components/Tooltip'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'button'> {
    tooltip?: string
}

export const FloatingButton = ({ className = "", children, tooltip, ...rest }: Props) => {
    return (
        <button className={`${styles.floatingButton} ${className}`}>
            {
                tooltip ?
                    <Tooltip text="Add new recipe">
                        {children}
                    </Tooltip>
                    :
                    children
            }
        </button>
    )
}
