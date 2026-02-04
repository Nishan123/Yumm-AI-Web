"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Ingredient } from "@/lib/types/recipe.type";
import Image from "next/image";

interface IngredientsListProps {
  ingredients: Ingredient[];
  onToggle?: (index: number) => void;
}

export const IngredientsList = ({
  ingredients,
  onToggle,
}: IngredientsListProps) => {
  if (!ingredients || ingredients.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No ingredients available
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ingredients.map((ingredient, index) => {
          const isChecked = !!ingredient.isReady;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onToggle?.(index)}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-all hover:bg-gray-50 dark:hover:bg-zinc-800/50",
                isChecked
                  ? "border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10"
                  : "border-gray-100 bg-white dark:border-zinc-800 dark:bg-zinc-900",
              )}
            >
              {ingredient.imageUrl ? (
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800">
                  <Image
                    src={ingredient.imageUrl}
                    alt={ingredient.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl dark:bg-zinc-800">
                  🍽️
                </div>
              )}

              <div className="flex flex-1 flex-col">
                <span
                  className={cn(
                    "font-bold text-gray-900 transition-all dark:text-gray-100",
                    isChecked &&
                      "text-gray-400 line-through dark:text-gray-500",
                  )}
                >
                  {ingredient.name}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {ingredient.quantity} {ingredient.unit}
                </span>
              </div>

              {/* Check Circle */}
              <div
                className={cn(
                  "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isChecked
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 text-transparent group-hover:border-green-400",
                )}
              >
                <Check className="h-4 w-4" strokeWidth={3} />
              </div>

              {/* Active Border Glow (Optional) */}
              {isChecked && (
                <motion.div
                  layoutId="glow"
                  className="absolute inset-0 rounded-2xl ring-2 ring-green-500/20"
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
