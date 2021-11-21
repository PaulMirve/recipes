interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
    centered?: boolean,
    uppercase?: boolean
}

export const Heading = ({ centered, children, className = "", variant, uppercase = true, ...rest }: Props) => {
    const getVariants = () => {
        switch (variant) {
            case "h1":
                return " heading--h1"
            case "h2":
                return "heading---h2";
            default:
                return "heading--h2"
        }
    }
    return (
        <h1 className={`heading ${uppercase ? "heading--uppercase" : ""} ${getVariants()} ${centered ? "tac" : ""} ${className}`} {...rest}>
            {children}
        </h1>
    )
}
