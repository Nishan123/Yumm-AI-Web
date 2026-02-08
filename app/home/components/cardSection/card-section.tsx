"use client";

import { useState, useEffect } from "react";
import Card from "./card";
import { getPublicRecipesAction } from "@/lib/actions/recipe-action";
import { Recipe } from "@/lib/types/recipe.type";

const CardSection = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await getPublicRecipesAction();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="w-340 mt-8 flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
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

  if (recipes.length === 0) {
    return (
      <div className="w-340 mt-8 flex justify-center items-center min-h-96">
        <p className="text-gray-600 text-lg">
          No recipes available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="w-340 mt-8 grid grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <Card key={recipe.recipeId} recipe={recipe} />
      ))}
    </div>
  );
};

export default CardSection;
