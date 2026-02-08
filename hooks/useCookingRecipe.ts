import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/context/auth-context";
import {
    getRecipeAction,
    getPublicRecipesAction,
    updateRecipeAction
} from "@/lib/actions/recipe-action";
import { cookbookApi } from "@/lib/api/cookbook";
import { toast } from "sonner";
import { Recipe } from "@/lib/types/recipe.type";
import { UserRecipe } from "@/lib/types/cookbook.type";
import { useRouter, useSearchParams } from "next/navigation";

export const useCookingRecipe = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const recipeId = searchParams.get("recipeId");
    const isGenerated = searchParams.get("generated") === "true";
    const { isAuthenticated, user, isLoading: isAuthLoading } = useAuth();

    const [recipe, setRecipe] = useState<Recipe | UserRecipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isInCookbook, setIsInCookbook] = useState(false);
    const [isAddingToCookbook, setIsAddingToCookbook] = useState(false);
    const [isGeneratedRecipe, setIsGeneratedRecipe] = useState(false);

    const fetchRecipe = useCallback(async () => {
        // Check for generated recipe from sessionStorage first
        if (isGenerated) {
            try {
                const generatedRecipeStr = sessionStorage.getItem("generatedRecipe");
                if (generatedRecipeStr) {
                    const generatedRecipe = JSON.parse(generatedRecipeStr) as Recipe;
                    setRecipe(generatedRecipe);
                    setIsGeneratedRecipe(true);
                    setLoading(false);
                    return;
                } else {
                    setError("Generated recipe not found. Please generate again.");
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.error("Failed to parse generated recipe:", err);
                setError("Failed to load generated recipe. Please try again.");
                setLoading(false);
                return;
            }
        }

        if (!recipeId) {
            setError("No recipe selected");
            setLoading(false);
            return;
        }

        // Wait for auth to load before fetching
        if (isAuthLoading) {
            return;
        }

        try {
            setLoading(true);

            let displayRecipe: Recipe | UserRecipe | null = null;
            let inCookbook = false;

            // 1. If user is logged in, check cookbook first
            if (user?.uid) {
                try {
                    inCookbook = await cookbookApi.checkIsInCookbook(user.uid, recipeId);

                    if (inCookbook) {
                        const userRecipe = await cookbookApi.getUserRecipeByOriginal(
                            user.uid,
                            recipeId,
                        );
                        if (userRecipe) {
                            displayRecipe = userRecipe;
                        } else {
                            console.error(
                                "Recipe is in cookbook but couldn't fetch user copy",
                            );
                        }
                    }
                } catch (err) {
                    console.error("Error checking cookbook:", err);
                }
            }

            // 2. If not in cookbook or user not logged in, fetch recipe directly by ID
            if (!displayRecipe) {
                try {
                    const foundRecipe = await getRecipeAction(recipeId);
                    if (foundRecipe) {
                        displayRecipe = foundRecipe;
                    }
                } catch (err) {
                    console.error("Failed to fetch recipe by ID", err);
                    // Fallback to existing public recipes logic if getRecipe failed
                    try {
                        const recipes = await getPublicRecipesAction();
                        const found = recipes.find((r) => r.recipeId === recipeId);
                        if (found) displayRecipe = found;
                    } catch (e) {
                        console.error("Fallback fetch failed", e);
                    }
                }
            }

            if (displayRecipe) {
                setRecipe(displayRecipe);
                setIsInCookbook(inCookbook);
                setError(null);
            } else {
                setError("Recipe not found");
            }
        } catch (err) {
            console.error("Failed to fetch recipe:", err);
            setError("Failed to load recipe");
        } finally {
            setLoading(false);
        }
    }, [recipeId, user?.uid, isAuthLoading, isGenerated]);

    useEffect(() => {
        fetchRecipe();
    }, [fetchRecipe]);

    const addToCookbook = async () => {
        if (!user?.uid || !recipe) {
            toast.error("Please login to add to cookbook");
            return;
        }

        if (isInCookbook) {
            toast.info("This recipe is already in your cookbook");
            return;
        }

        const targetId =
            (recipe as UserRecipe).originalRecipeId || (recipe as Recipe).recipeId;

        if (!targetId) {
            toast.error("Invalid recipe ID");
            return;
        }

        try {
            setIsAddingToCookbook(true);
            await cookbookApi.addToCookbook(user.uid, targetId);
            toast.success("Recipe added to your cookbook!");
            await fetchRecipe();
        } catch (err: any) {
            console.error("Failed to add to cookbook:", err);
            if (err.response?.status === 409) {
                toast.error("This recipe is already in your cookbook");
                await fetchRecipe();
            } else {
                toast.error(
                    err.response?.data?.message || "Failed to add recipe to cookbook",
                );
            }
        } finally {
            setIsAddingToCookbook(false);
        }
    };

    const updateProgress = async (updates: Partial<UserRecipe>) => {
        const isOwner = user?.uid && (recipe as Recipe).generatedBy === user.uid;
        const canUpdate = isInCookbook || isOwner;

        if (!canUpdate || !user?.uid) return;

        setRecipe((prev) => {
            if (!prev) return null;
            return { ...prev, ...updates } as UserRecipe;
        });

        try {
            const userRecipe = recipe as UserRecipe;
            if (isInCookbook && userRecipe.userRecipeId) {
                await cookbookApi.updateUserRecipe(userRecipe.userRecipeId, updates);
            } else if (isOwner) {
                console.log("Persisting progress for owner to source recipe");
                await updateRecipeAction({
                    ...recipe,
                    ...updates,
                } as Recipe);
            }
        } catch (err) {
            console.error("Failed to update progress:", err);
            toast.error("Failed to save progress");
            await fetchRecipe();
        }
    };

    return {
        recipe,
        loading,
        error,
        isInCookbook,
        isAddingToCookbook,
        addToCookbook,
        updateProgress,
        user
    };
};
