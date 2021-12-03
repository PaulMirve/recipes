import { useLikeCommentMutation, User } from "generated/graphql"
import { showErrorAlert } from "helpers/show-alert"
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { useGlobalContext } from "./useGlobalContext"

export const useCommentLike = ({ likes, idComment }: { likes: User[], idComment: number }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState<number>(likes.length)
    const { user } = useGlobalContext();
    const router = useRouter();
    const [like] = useLikeCommentMutation({
        variables: {
            idComment
        }
    });

    useEffect(() => {
        setIsLiked(likes.some(usr => usr.username === user?.username));
    }, [user]);

    const likeComment = async () => {
        if (user) {
            try {
                await like();
                setIsLiked(prev => !prev);
                setLikesCount(prev => {
                    if (isLiked) {
                        return prev - 1;
                    } else {
                        return prev + 1
                    }
                });
            } catch {
                showErrorAlert();
            }
        } else {
            router.push('/login')
        }
    }

    return {
        likesCount,
        likeComment,
        isLiked
    }
}