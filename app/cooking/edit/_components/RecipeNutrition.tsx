"use client";

import React from "react";
import { Recipe } from "@/lib/types/recipe.type";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RecipeNutritionProps {
  formData: Recipe;
  setFormData: (data: Recipe) => void;
}

export const RecipeNutrition = ({
  formData,
  setFormData,
}: RecipeNutritionProps) => {
  const handleNutritionChange = (
    field: "protein" | "carbs" | "fat" | "fiber",
    value: string,
  ) => {
    const numValue = parseFloat(value) || 0;
    setFormData({
      ...formData,
      nutrition: {
        ...formData.nutrition,
        [field]: numValue,
      },
    });
  };

  const handleCalorieChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData({ ...formData, calorie: numValue });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">
        Nutrition Information
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="protein">Protein (g)</Label>
          <Input
            id="protein"
            type="number"
            value={formData.nutrition?.protein || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleNutritionChange("protein", e.target.value)
            }
            placeholder="0"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="carbs">Carbs (g)</Label>
          <Input
            id="carbs"
            type="number"
            value={formData.nutrition?.carbs || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleNutritionChange("carbs", e.target.value)
            }
            placeholder="0"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="fat">Fat (g)</Label>
          <Input
            id="fat"
            type="number"
            value={formData.nutrition?.fat || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleNutritionChange("fat", e.target.value)
            }
            placeholder="0"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="fiber">Fiber (g)</Label>
          <Input
            id="fiber"
            type="number"
            value={formData.nutrition?.fiber || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleNutritionChange("fiber", e.target.value)
            }
            placeholder="0"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="calorie">Calories</Label>
          <Input
            id="calorie"
            type="number"
            value={formData.calorie || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleCalorieChange(e.target.value)
            }
            placeholder="0"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};
