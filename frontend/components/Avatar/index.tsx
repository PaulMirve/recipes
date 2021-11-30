import { ComponentPropsWithoutRef } from 'react'
import styles from '@sass/components/avatar.module.scss'

interface Props extends ComponentPropsWithoutRef<'div'> {
    name: string
}

const Avatar = ({ name, className = "", ...rest }: Props) => {
    const getInitials = () => {
        const splitName = name.split(' ');
        return `${splitName[0][0]}${splitName[1][0]}`
    }
    return (
        <div className={`${styles.avatar} ${className}`} {...rest}>
            {getInitials()}
        </div>
    )
}

export default Avatar
