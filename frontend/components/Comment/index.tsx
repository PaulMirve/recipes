import styles from '@sass/components/comment.module.scss'
import Avatar from 'components/Avatar'
import Icon from 'components/Icon'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
    comment?: string,
    likes: number,
    username: string,
    name: string,
    idComment: number
}

const Comment = ({ children, comment, className = "", likes, username, name, idComment, ...props }: Props) => {
    return (
        <div className={`${styles.comment} ${className}`} {...props}>
            <Avatar className={styles.avatar} style={{ width: '8rem', fontSize: '2.4rem' }} name={name} />
            <span>
                <b className={styles.username}>{username}</b>
                {comment ? comment : children}
            </span>
            <span className={styles.likes}>
                <Icon.ThumbUpOutline />
                {likes}
            </span>
        </div>
    )
}

export default Comment
