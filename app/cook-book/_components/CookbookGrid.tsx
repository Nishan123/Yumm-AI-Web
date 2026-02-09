"use client";

import { UserRecipe } from "@/lib/types/cookbook.type";
import { CookbookRecipeCard } from "./CookbookRecipeCard";
import { EmptyState } from "./EmptyState";

interface CookbookGridProps {
  recipes: UserRecipe[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export const CookbookGrid = ({
  recipes,
  loading,
  error,
  onRetry,
}: CookbookGridProps) => {
  // Loading state
  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-4xl p-2 animate-pulse"
          >
            <div className="h-48 bg-gray-200 rounded-3xl" />
            <div className="flex flex-col gap-1.5 pt-2">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="flex gap-1.5 pt-2">
                <div className="h-6 bg-gray-200 rounded-full w-16" />
                <div className="h-6 bg-gray-200 rounded-full w-16" />
                <div className="h-6 bg-gray-200 rounded-full w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (recipes.length === 0) {
    return <EmptyState />;
  }

  // Success state with recipes
  return (
    <div className="mt-8 grid grid-cols-4 gap-6">
      {recipes.map((recipe, index) => (
        <CookbookRecipeCard
          key={recipe.userRecipeId}
          recipe={recipe}
          index={index}
        />
      ))}
    </div>
  );
};
