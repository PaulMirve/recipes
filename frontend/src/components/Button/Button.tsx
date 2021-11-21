interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    fullwidth?: boolean
}

export const Button = ({ fullwidth, className = "", ...rest }: Props) => {
    return (
        <button className={`btn ${className}`} {...rest}>

        </button>
    )
}
