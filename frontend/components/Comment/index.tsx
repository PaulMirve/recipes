import styles from '@sass/components/comment.module.scss'
import Avatar from 'components/Avatar'
import Icon from 'components/Icon'
import { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { useCommentLike } from 'hooks/useCommentLike'
import { User } from 'generated/graphql'

interface Props extends ComponentPropsWithoutRef<'div'> {
    comment?: string,
    likes: User[],
    username: string,
    name: string,
    idComment: number
}

const Comment = ({ children, comment, className = "", likes, username, name, idComment, ...props }: Props) => {
    const router = useRouter();
    const { likeComment, likesCount, isLiked } = useCommentLike({ likes, idComment });

    return (
        <div className={`${styles.comment} ${className}`} {...props}>
            <Avatar onClick={() => router.push(`/user/${username}`)} className={styles.avatar} style={{ width: '8rem', fontSize: '2.4rem' }} name={name} />
            <span>
                <Link href={`/user/${username}`}>
                    <a className={styles.username}>
                        <b>{username}</b>
                    </a>
                </Link>
                {comment ? comment : children}
            </span>
            <span className={styles.likes}>
                {isLiked ? <Icon.ThumbUpFilled onClick={likeComment} /> : <Icon.ThumbUpOutline onClick={likeComment} />}
                {likesCount}
            </span>
        </div>
    )
}

export default Comment
