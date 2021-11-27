import { ComponentPropsWithoutRef } from 'react'
import sprite from '../../sprite.svg'

interface Props extends ComponentPropsWithoutRef<'svg'> {
    icon: "bell" | "message" | "thumbs-up" | "clipboard" | "plus-circle" | "profile" | "logout" | "plus" | "usa-mono" | "mexico-mono" | "japan-mono" | "india-mono" | "china-mono" | "greece-mono" | "italy-mono" | "mexico" | "japan" | "usa" | "italy" | "india" | "greece" | "china" | 'menu'
}

const Icon = ({ className = "", icon, ...rest }: Props) => {
    return (
        <svg className={`${className}`} {...rest}>
            <use href={`${sprite}#icon-${icon}`}></use>
        </svg>
    )
}

export default Icon
