interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    fullwidth?: boolean,
    variant?: "default" | "outlined"
}

export const Button = ({ fullwidth, className = "", variant, ...rest }: Props) => {
    const getVariant = () => {
        switch (variant) {
            case "outlined":
                return "btn--outlined";
            default:
                return "";
        }
    }
    return (
        <button className={`btn ${className} ${getVariant()} ${fullwidth ? "fullwidth" : ""}`} {...rest}>

        </button>
    )
}
