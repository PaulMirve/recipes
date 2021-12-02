import { Comment, useSaveCommentMutation } from "generated/graphql"
import { loadingAlert, showAlert } from "helpers/show-alert"
import { useRouter } from "next/dist/client/router"
import { useState } from "react"
import { useGlobalContext } from "./useGlobalContext"

export const useComment = ({ idRecipe, comments }: { idRecipe: number, comments: Comment[] }) => {
    const [commentsList, setCommentsList] = useState<Comment[]>([...comments].sort((a, b) => Date.parse(a.dateCreated) - Date.parse(b.dateCreated)).reverse())
    const [saveComment] = useSaveCommentMutation();
    const { user } = useGlobalContext();
    const router = useRouter();

    const addComment = async ({ comment }: { comment: string }) => {
        if (user) {
            const loading = loadingAlert();
            loading.showLoading();

            try {
                const { data } = await saveComment({
                    variables: {
                        comment: {
                            comment,
                            idRecipe
                        }
                    }
                });
                if (data?.saveComment) {
                    const _comment = data.saveComment as Comment;
                    setCommentsList(prev => [_comment, ...prev])
                    loading.hideLoading();
                    showAlert({
                        title: 'Comment added successfully',
                        text: 'Your comment has been added!',
                        icon: 'success'
                    });
                }

            } catch (err) {
                showAlert({
                    title: 'Ups! Something happened!',
                    text: 'An error has happened, please contact the system administrator.',
                    icon: 'error'
                });
            }
        } else {
            router.push('/login');
        }
    }

    return {
        commentsList,
        addComment
    }
}