import { Icon } from '../Icon'

export type Countries = "mexico" | "india" | "japan" | "greece" | "china" | "italy"

interface Props {
    icon: Countries,
    name: string
}
export const FoodCategory = ({ icon, name }: Props) => {
    return (
        <div className="food-category">
            <Icon icon={icon} />
            <div className="food-category__name">{name}</div>
        </div>
    )
}
