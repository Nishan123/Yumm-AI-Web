"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Card from "./card";
import { getPublicRecipesAction } from "@/lib/actions/recipe-action";
import { Recipe } from "@/lib/types/recipe.type";
import { Loader2 } from "lucide-react";

const CardSection = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        // Pass page and size (10)
        const data = await getPublicRecipesAction(page, 10);

        setRecipes((prev) => {
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
          // Fallback if pagination is missing (should not happen with new action)
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
  }, [page]); // Re-run when page changes

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

  if (error && recipes.length === 0) {
    return (
      <div className="w-340 mt-8 flex justify-center items-center min-h-96">
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
      <div className="w-340 mt-8 flex justify-center items-center min-h-96">
        <p className="text-gray-600 text-lg">
          No recipes available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="w-340 mt-8">
      <div className="grid grid-cols-4 gap-6">
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
        <div className="w-full flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      )}
    </div>
  );
};

export default CardSection;
