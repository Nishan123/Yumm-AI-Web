"use client";

import { RecipeHeader } from "./_components/RecipeHeader";
import { RecipeContent } from "./_components/RecipeContent";
import { RecipeImageCarousel } from "./_components/RecipeImageCarousel";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { recipeApi } from "@/lib/api/recipe";
import { cookbookApi } from "@/lib/api/cookbook";
import { Recipe } from "@/lib/types/recipe.type";
import { UserRecipe } from "@/lib/types/cookbook.type";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";

export default function CookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recipeId = searchParams.get("recipeId");
  const { user, isLoading: isAuthLoading } = useAuth();

  const [recipe, setRecipe] = useState<Recipe | UserRecipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInCookbook, setIsInCookbook] = useState(false);
  const [isAddingToCookbook, setIsAddingToCookbook] = useState(false);

  const fetchRecipe = useCallback(async () => {
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
              // Recipe is in cookbook but fetch failed - this is an error state
              console.error(
                "Recipe is in cookbook but couldn't fetch user copy",
              );
              // We'll fall back to public recipe but maintain inCookbook state
            }
          }
        } catch (err) {
          console.error("Error checking cookbook:", err);
          // Continue to fetch public recipe
        }
      }

      // 2. If not in cookbook or user not logged in, fetch public recipe
      // Also fetch if we couldn't get the user recipe (as fallback)
      if (!displayRecipe) {
        const recipes = await recipeApi.getPublicRecipes();
        const foundRecipe = recipes.find((r) => r.recipeId === recipeId);

        if (foundRecipe) {
          displayRecipe = foundRecipe;
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
  }, [recipeId, user?.uid, isAuthLoading]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const handleAddToCookbook = async () => {
    if (!user?.uid || !recipe) {
      toast.error("Please login to add to cookbook");
      return;
    }

    // Defensive check - don't add if already in cookbook
    if (isInCookbook) {
      toast.info("This recipe is already in your cookbook");
      return;
    }

    // Determine the ID to use
    // If viewing a UserRecipe (shouldn't happen but defensive), use originalRecipeId
    // Otherwise use recipeId
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

      // Refresh to get the UserRecipe version
      await fetchRecipe();
    } catch (err: any) {
      console.error("Failed to add to cookbook:", err);

      // Handle specific error cases
      if (err.response?.status === 409) {
        toast.error("This recipe is already in your cookbook");
        // Refresh to sync state
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

  const handleUpdateProgress = async (updates: Partial<UserRecipe>) => {
    if (!isInCookbook || !user?.uid) return;

    // Optimistic update
    setRecipe((prev) => {
      if (!prev) return null;
      return { ...prev, ...updates } as UserRecipe;
    });

    try {
      const userRecipe = recipe as UserRecipe;
      if (userRecipe.userRecipeId) {
        await cookbookApi.updateUserRecipe(userRecipe.userRecipeId, updates);
      }
    } catch (err) {
      console.error("Failed to update progress:", err);
      toast.error("Failed to save progress");
      // Revert by re-fetching
      await fetchRecipe();
    }
  };

  if (loading || isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">⚠️ {error || "Recipe not found"}</p>
          <button
            onClick={() => router.push("/home")}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 inline-block"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-white dark:bg-zinc-950 md:flex md:h-screen md:overflow-hidden">
      {/* Mobile Header (Floating) */}
      <div className="absolute left-0 top-0 z-20 w-full md:hidden">
        <RecipeHeader />
      </div>

      {/* Image Section */}
      <div className="relative h-[30vh] w-full bg-white dark:bg-zinc-950 p-4 md:h-full md:w-1/3 lg:w-4/12 md:p-6 md:pr-0">
        <div className="relative h-full w-full">
          <RecipeImageCarousel
            images={recipe.images}
            recipeName={recipe.recipeName}
          />
          {/* Desktop Header (Overlay on Image) */}
          <div className="hidden absolute left-0 top-0 z-30 w-full md:block pointer-events-none">
            <div className="pointer-events-auto">
              <RecipeHeader />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 w-full bg-white dark:bg-zinc-950 md:w-2/3 md:overflow-y-auto lg:w-8/12">
        <div className="md:p-10 lg:p-12">
          <RecipeContent
            recipe={recipe}
            isInCookbook={isInCookbook}
            onAddToCookbook={handleAddToCookbook}
            isAddingToCookbook={isAddingToCookbook}
            onUpdateProgress={handleUpdateProgress}
          />
        </div>
      </div>
    </main>
  );
}
