import { Icon } from '../Icon'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    icon: "usa" | "italy" | "mexico" | "india"
}

export const FoodCategory = ({ icon, ...rest }: Props) => {
    return (
        <div className="food-category" {...rest}>
            <Icon icon={icon} />
        </div>
    )
}
