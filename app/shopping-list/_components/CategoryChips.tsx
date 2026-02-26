"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SHOPPING_LIST_CATEGORIES } from "@/lib/types/shopping-list.type";

interface CategoryChipsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryChips = ({
  selectedCategory,
  onCategoryChange,
}: CategoryChipsProps) => {
  return (
    <div className="px-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {SHOPPING_LIST_CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
            selectedCategory === cat.value
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700",
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};
