import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { toggleSaveRecipeAction } from "@/lib/actions/recipe-action";
import { toast } from "sonner";
import { Recipe } from "@/lib/types/recipe.type";

export const useRecipeLike = (recipe: Recipe) => {
    const { user } = useAuth();

    const [isLiked, setIsLiked] = useState<boolean>(
        user && recipe.likes ? recipe.likes.includes(user.uid) : false
    );

    useEffect(() => {
        setIsLiked(user && recipe.likes ? recipe.likes.includes(user.uid) : false);
    }, [user, recipe.likes]);

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
            const targetId = (recipe as any).originalRecipeId || recipe.recipeId;
            console.log("Toggling like for targetId:", targetId);
            await toggleSaveRecipeAction(targetId);
        } catch (error: any) {
            // Revert on failure
            setIsLiked(previousState);
            toast.error(error.message || "Failed to update save status");
        }
    }, [user, isLiked, recipe]);

    return { isLiked, toggleLike };
};
