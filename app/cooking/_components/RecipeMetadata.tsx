"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Recipe } from "@/lib/types/recipe.type";
import { Flame, Users, UtensilsCrossed, Globe } from "lucide-react";

interface RecipeMetadataProps {
  recipe: Recipe;
  className?: string;
}

export const RecipeMetadata = ({ recipe, className }: RecipeMetadataProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "grid grid-cols-2 gap-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 dark:from-zinc-900 dark:to-zinc-800/50",
        className,
      )}
    >
      {/* Calories */}
      <div className="flex items-center gap-3 rounded-xl bg-white p-4 border border-gray-100 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10">
          <Flame className="h-5 w-5 text-orange-500" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {recipe.calorie}
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Calories
          </span>
        </div>
      </div>

      {/* Servings */}
      <div className="flex items-center gap-3 rounded-xl bg-white p-4 border border-gray-100 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
          <Users className="h-5 w-5 text-blue-500" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {recipe.servings}
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Servings
          </span>
        </div>
      </div>

      {/* Meal Type */}
      <div className="flex items-center gap-3 rounded-xl bg-white p-4 border border-gray-100 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-500/10">
          <UtensilsCrossed
            className="h-5 w-5 text-purple-500"
            strokeWidth={2.5}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {recipe.mealType}
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Meal Type
          </span>
        </div>
      </div>

      {/* Cuisine */}
      <div className="flex items-center gap-3 rounded-xl bg-white p-4 border border-gray-100 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/10">
          <Globe className="h-5 w-5 text-green-500" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {recipe.cuisine}
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Cuisine
          </span>
        </div>
      </div>

      {/* Nutrition Info - Full Width if available */}
      {recipe.nutrition && (
        <div className="col-span-2 flex flex-col gap-2 rounded-xl bg-white p-4 border border-gray-100 dark:border-zinc-800 dark:bg-zinc-900/50">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Nutritional Information
          </span>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {recipe.nutrition.protein !== undefined && (
              <div className="flex flex-col items-center rounded-lg bg-gray-50 p-2 dark:bg-zinc-800/50">
                <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                  {recipe.nutrition.protein}g
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Protein
                </span>
              </div>
            )}
            {recipe.nutrition.carbs !== undefined && (
              <div className="flex flex-col items-center rounded-lg bg-gray-50 p-2 dark:bg-zinc-800/50">
                <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                  {recipe.nutrition.carbs}g
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Carbs
                </span>
              </div>
            )}
            {recipe.nutrition.fat !== undefined && (
              <div className="flex flex-col items-center rounded-lg bg-gray-50 p-2 dark:bg-zinc-800/50">
                <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                  {recipe.nutrition.fat}g
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Fat
                </span>
              </div>
            )}
            {recipe.nutrition.fiber !== undefined && (
              <div className="flex flex-col items-center rounded-lg bg-gray-50 p-2 dark:bg-zinc-800/50">
                <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                  {recipe.nutrition.fiber}g
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Fiber
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};
