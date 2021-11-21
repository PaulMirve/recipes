import { SVGProps } from "react";
import sprite from '../../sprite.svg';

interface Props extends SVGProps<SVGSVGElement> {
    icon: "bell" | "message" | "thumbs-up" | "clipboard" | "plus-circle" | "profile" | "logout" | "plus" | "usa-mono" | "mexico-mono" | "japan-mono" | "india-mono" | "china-mono" | "greece-mono" | "italy-mono" | "mexico" | "japan" | "usa" | "italy" | "india" | "greece" | "china"
}

export const Icon = ({ className = "", icon, ...rest }: Props) => {
    return (
        <svg className={`icon ${className}`} {...rest}>
            <use href={`${sprite}#icon-${icon}`}></use>
        </svg>
    )
}
