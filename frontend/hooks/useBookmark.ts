import { Recipe, useBookmarkRecipeMutation } from "generated/graphql";
import { showErrorAlert } from "helpers/show-alert";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";

export const useBookmark = ({ bookmarkedBy, idRecipe }: Recipe) => {
    const { user } = useGlobalContext();
    const [isRecipeBookmarked, setIsRecipeBookmarked] = useState<boolean>(bookmarkedBy.find(u => u.username === user?.username) != null)
    const [bookmark] = useBookmarkRecipeMutation({ variables: { idRecipe } })
    const router = useRouter();

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