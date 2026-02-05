import { useState, useCallback } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { recipeApi } from "@/lib/api/recipe";
import { toast } from "sonner";
import { Recipe } from "@/lib/types/recipe.type";

export const useRecipeLike = (recipe: Recipe) => {
    const { user } = useAuth();

    // Initialize state based on whether user's ID is in the recipe's likes
    const [isLiked, setIsLiked] = useState<boolean>(
        user ? recipe.likes.includes(user.uid) : false
    );

    const toggleLike = useCallback(async (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }

        if (!user) {
            toast.error("Please login to save recipes");
            return;
        }

        // Optimistic update
        const previousState = isLiked;
        setIsLiked(!previousState);

        try {
            await recipeApi.toggleSaveRecipe(recipe.recipeId);
        } catch (error) {
            // Revert on failure
            setIsLiked(previousState);
            toast.error("Failed to update save status");
        }
    }, [user, isLiked, recipe.recipeId]);

    return { isLiked, toggleLike };
};
