"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Card from "./card";
import { getPublicRecipesAction } from "@/lib/actions/recipe-action";
import { Recipe } from "@/lib/types/recipe.type";
import { CardSectionSkeleton } from "./card-skeleton";

interface CardSectionProps {
  mealType?: string;
}

const CardSection = ({ mealType }: CardSectionProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // Reset when mealType changes
  useEffect(() => {
    setRecipes([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [mealType]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await getPublicRecipesAction(page, 10, mealType);

        setRecipes((prev) => {
          // On page 1 (after reset), replace entirely; otherwise append
          if (page === 1) {
            return data.recipes;
          }
          // Create a set of existing IDs to prevent duplicates
          const existingIds = new Set(prev.map((r) => r.recipeId));
          const newRecipes = data.recipes.filter(
            (r) => !existingIds.has(r.recipeId),
          );
          return [...prev, ...newRecipes];
        });

        // Update hasMore based on pagination data
        if (data.pagination) {
          setHasMore(data.pagination.page < data.pagination.totalPages);
        } else {
          setHasMore(data.recipes.length > 0);
        }
      } catch (err: any) {
        console.error("Failed to fetch recipes:", err);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page, mealType]);

  const lastRecipeElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  if (recipes.length === 0 && loading) {
    return <CardSectionSkeleton />;
  }

  if (error && recipes.length === 0) {
    return (
      <div className="w-full max-w-[1360px] px-4 lg:px-0 mt-8 flex justify-center items-center min-h-96">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (recipes.length === 0 && !loading) {
    return (
      <div className="w-full max-w-[1360px] px-4 lg:px-0 mt-8 flex justify-center items-center min-h-96">
        <p className="text-gray-600 text-lg">
          No recipes available for this category.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1360px] px-4 lg:px-0 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {recipes.map((recipe, index) => {
          if (recipes.length === index + 1) {
            return (
              <div ref={lastRecipeElementRef} key={recipe.recipeId}>
                <Card recipe={recipe} />
              </div>
            );
          } else {
            return <Card key={recipe.recipeId} recipe={recipe} />;
          }
        })}
      </div>

      {loading && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="w-full border border-gray-100 dark:border-zinc-800 rounded-4xl p-2 animate-pulse"
            >
              <div className="rounded-3xl w-full h-48 sm:h-56 lg:h-64 bg-gray-200 dark:bg-zinc-800" />
              <div className="flex flex-col gap-1.5 pt-2">
                <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded-lg w-3/4" />
                <div className="h-4 bg-gray-100 dark:bg-zinc-800/60 rounded-lg w-full" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardSection;
