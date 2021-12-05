import styles from '@sass/components/tag.module.scss'
import { useRouter } from 'next/dist/client/router'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
    title: string,
    link?: boolean
}

const Tag = ({ title, className = "", link, ...rest }: Props) => {
    const router = useRouter();

    return (
        <div onClick={link ? () => router.push(`/tag/${title}`) : () => { }} className={`${styles.tag} ${link && styles.link} ${className}`} {...rest}>
            {title}
        </div>
    )
}

export default Tag
