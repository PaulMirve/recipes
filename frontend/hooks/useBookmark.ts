import { Recipe, useBookmarkRecipeMutation } from "generated/graphql";
import { showErrorAlert } from "helpers/show-alert";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useGlobalContext } from "./useGlobalContext";

export const useBookmark = ({ bookmarkedBy, idRecipe }: Recipe) => {
    const { user } = useGlobalContext();
    const [isRecipeBookmarked, setIsRecipeBookmarked] = useState<boolean>(false)
    const [bookmark] = useBookmarkRecipeMutation({ variables: { idRecipe } })
    const router = useRouter();

    useEffect(() => {
        setIsRecipeBookmarked(bookmarkedBy.find(u => u.username === user?.username) != null);
    }, [user])

    const bookmarkRecipe = async () => {
        if (user) {
            try {
                await bookmark();
                setIsRecipeBookmarked(prev => !prev);
            } catch {
                showErrorAlert();
            }
        } else {
            router.push('/login');
        }
    }

    return {
        isRecipeBookmarked,
        bookmarkRecipe
    }
}