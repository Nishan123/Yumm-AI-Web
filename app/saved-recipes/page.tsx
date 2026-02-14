"use client";

import { useEffect, useState } from "react";
import Navbar from "../home/components/navBar/nav-bar";
import { useAuth } from "@/lib/context/auth-context";
import { getSavedRecipesAction } from "@/lib/actions/recipe-action";
import { Recipe } from "@/lib/types/recipe.type";
import { SavedRecipeGrid } from "./_components/SavedRecipeGrid";

const SavedRecipes = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    if (!user?.uid) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getSavedRecipesAction(user.uid);
      setRecipes(data);
    } catch (err: any) {
      console.error("Failed to fetch saved recipes:", err);
      setError(err.message || "Failed to fetch saved recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [user?.uid, authLoading]);

  const handleRemoveRecipe = (recipeId: string) => {
    setRecipes((prev) => prev.filter((r) => r.recipeId !== recipeId));
  };

  return (
    <div className="flex flex-col items-center min-h-screen mb-[200px]">
      <Navbar />

      <div className="w-full max-w-7xl px-4 md:px-8 mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Saved Recipes</h1>

        <SavedRecipeGrid
          recipes={recipes}
          loading={loading}
          error={error}
          onRetry={fetchRecipes}
          onRemove={handleRemoveRecipe}
        />
      </div>
    </div>
  );
};

export default SavedRecipes;
