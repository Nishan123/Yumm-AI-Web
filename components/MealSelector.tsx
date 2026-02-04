"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { MEAL_OPTIONS } from "@/data/options";

interface MealSelectorProps {
  selectedMeal: string;
  onSelect: (value: string) => void;
  className?: string;
}

export const MealSelector = ({
  selectedMeal,
  onSelect,
  className,
}: MealSelectorProps) => {
  return (
    <div className={cn("flex flex-wrap gap-3 mt-2", className)}>
      {MEAL_OPTIONS.map((meal) => {
        const isSelected = selectedMeal === meal.value;
        const Icon = meal.icon;
        return (
          <button
            key={meal.value}
            onClick={() => onSelect(meal.value)}
            // Increased padding and sizing
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all active:scale-95 duration-200",
              isSelected
                ? "bg-black text-white border-black shadow-md"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50",
            )}
          >
            <Icon className="w-4 h-4" />
            {meal.label}
          </button>
        );
      })}
    </div>
  );
};
