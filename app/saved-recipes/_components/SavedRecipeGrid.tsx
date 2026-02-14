"use client";

import { Recipe } from "@/lib/types/recipe.type";
import Card from "@/app/home/components/cardSection/card";
import { SavedRecipeCard } from "./SavedRecipeCard";
import { RecipeCardSkeleton } from "./RecipeCardSkeleton";

interface SavedRecipeGridProps {
  recipes: Recipe[];
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
  onRemove?: (recipeId: string) => void;
}

export const SavedRecipeGrid = ({
  recipes,
  loading,
  error,
  onRetry,
  onRemove,
}: SavedRecipeGridProps) => {
  // Loading state with Skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] py-20">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">⚠️ {error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  // Empty state
  if (recipes.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600 text-lg">No saved recipes yet!</p>
      </div>
    );
  }

  // Success state with recipes
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <SavedRecipeCard
          key={recipe.recipeId}
          recipe={recipe}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};
