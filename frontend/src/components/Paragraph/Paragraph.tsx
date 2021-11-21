interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    centered?: boolean
}

export const Paragraph = ({ children, className = "", centered, ...rest }: Props) => {
    return (
        <p className={`paragraph ${className}`} {...rest}>
            {children}
        </p>
    )
}
