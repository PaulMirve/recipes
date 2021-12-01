import { Recipe, useLikeRecipeMutation } from "generated/graphql";
import { showErrorAlert } from "helpers/show-alert";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useGlobalContext } from "./useGlobalContext";

export const useLikes = ({ likes, idRecipe }: Recipe) => {
    const { user } = useGlobalContext();
    const [isRecipeLiked, setIsRecipeLiked] = useState<boolean>(false)
    const [likesCount, setLikesCount] = useState<number>(likes.length)
    const router = useRouter();
    const [likeRecipe] = useLikeRecipeMutation({
        variables: {
            idRecipe
        }
    });

    useEffect(() => {
        setIsRecipeLiked(likes.find(u => u.username === user?.username) != null);
    }, [user])

    const onLikeRecipe = async () => {
        if (user) {
            try {
                await likeRecipe();
                setLikesCount(prev => isRecipeLiked ? prev - 1 : prev + 1);
                setIsRecipeLiked(prev => !prev);
            } catch (err) {
                showErrorAlert();
            }
        } else {
            router.push('/login');
        }
    }

    return {
        likesCount,
        onLikeRecipe,
        isRecipeLiked
    }
}