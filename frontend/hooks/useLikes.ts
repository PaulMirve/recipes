import { Recipe, useLikeRecipeMutation } from "generated/graphql";
import { showErrorAlert } from "helpers/show-alert";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";

export const useLikes = ({ likes, idRecipe }: Recipe) => {
    const { user } = useGlobalContext();
    const [recipeIsLiked, setRecipeIsLiked] = useState<boolean>(likes.find(u => u.username === user?.username) != null)
    const [likesCount, setLikesCount] = useState<number>(likes.length)
    const router = useRouter();
    const [likeRecipe] = useLikeRecipeMutation({
        variables: {
            idRecipe
        }
    });

    const onLikeRecipe = async () => {
        if (user) {
            try {
                await likeRecipe();
                setLikesCount(prev => prev + 1);
                setRecipeIsLiked(prev => !prev);
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
        recipeIsLiked
    }
}