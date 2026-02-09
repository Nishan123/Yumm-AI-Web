"use client";

import React from "react";
import { Recipe, Ingredient } from "@/lib/types/recipe.type";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface RecipeIngredientsProps {
  formData: Recipe;
  setFormData: (data: Recipe) => void;
}

export const RecipeIngredients = ({
  formData,
  setFormData,
}: RecipeIngredientsProps) => {
  const addIngredient = () => {
    const newIngredient: Ingredient = {
      ingredientId: uuidv4(),
      name: "",
      quantity: "",
      unit: "",
      isReady: false,
    };
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, newIngredient],
    });
  };

  const removeIngredient = (index: number) => {
    const updated = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updated });
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string,
  ) => {
    const updated = [...formData.ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, ingredients: updated });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
          Ingredients
        </h2>
        <button
          onClick={addIngredient}
          className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm transition-all active:scale-95"
        >
          <Plus size={16} />
          Add Ingredient
        </button>
      </div>
      <div className="space-y-3">
        {formData.ingredients.map((ingredient, index) => (
          <div
            key={ingredient.ingredientId}
            className="flex gap-2 items-start p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="md:col-span-2">
                <Label htmlFor={`ingredient-name-${index}`} className="text-xs">
                  Name
                </Label>
                <Input
                  id={`ingredient-name-${index}`}
                  type="text"
                  value={ingredient.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateIngredient(index, "name", e.target.value)
                  }
                  placeholder="e.g., Tomatoes"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label
                    htmlFor={`ingredient-quantity-${index}`}
                    className="text-xs"
                  >
                    Quantity
                  </Label>
                  <Input
                    id={`ingredient-quantity-${index}`}
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateIngredient(index, "quantity", e.target.value)
                    }
                    placeholder="2"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`ingredient-unit-${index}`}
                    className="text-xs"
                  >
                    Unit
                  </Label>
                  <Input
                    id={`ingredient-unit-${index}`}
                    type="text"
                    value={ingredient.unit || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateIngredient(index, "unit", e.target.value)
                    }
                    placeholder="cups"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => removeIngredient(index)}
              className="mt-6 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              title="Remove ingredient"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
