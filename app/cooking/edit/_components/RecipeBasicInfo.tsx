"use client";

import React from "react";
import { Recipe } from "@/lib/types/recipe.type";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RecipeBasicInfoProps {
  formData: Recipe;
  setFormData: (data: Recipe) => void;
}

export const RecipeBasicInfo = ({
  formData,
  setFormData,
}: RecipeBasicInfoProps) => {
  const handleChange = (field: keyof Recipe, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">
        Basic Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="recipeName">Recipe Name</Label>
          <Input
            id="recipeName"
            type="text"
            value={formData.recipeName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("recipeName", e.target.value)
            }
            placeholder="Enter recipe name"
            className="mt-1"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange("description", e.target.value)
            }
            placeholder="Enter recipe description"
            rows={3}
            className="mt-1 w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <Label htmlFor="mealType">Meal Type</Label>
          <Input
            id="mealType"
            type="text"
            value={formData.mealType}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("mealType", e.target.value)
            }
            placeholder="e.g., Breakfast, Lunch, Dinner"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="cuisine">Cuisine</Label>
          <Input
            id="cuisine"
            type="text"
            value={formData.cuisine}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("cuisine", e.target.value)
            }
            placeholder="e.g., Italian, Indian, Chinese"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="estCookingTime">Cooking Time</Label>
          <Input
            id="estCookingTime"
            type="text"
            value={formData.estCookingTime}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("estCookingTime", e.target.value)
            }
            placeholder="e.g., 30 mins, 1 hour"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="servings">Servings</Label>
          <Input
            id="servings"
            type="number"
            value={formData.servings}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("servings", parseInt(e.target.value) || 1)
            }
            placeholder="Number of servings"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};
