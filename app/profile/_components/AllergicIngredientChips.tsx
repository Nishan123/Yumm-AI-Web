"use client";

import React from "react";
import { X } from "lucide-react";
import { IngredientModel } from "@/data/mockIngredients";

interface AllergicIngredientChipsProps {
  items: IngredientModel[];
  onRemoveItem: (id: string) => void;
}

export const AllergicIngredientChips = ({
  items,
  onRemoveItem,
}: AllergicIngredientChipsProps) => {
  if (items.length === 0) {
    return (
      <div className="w-full text-center py-8 text-gray-400 text-sm">
        No allergies added yet
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-2 bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30 rounded-full pl-4 pr-2 py-2 animate-in fade-in zoom-in duration-200"
        >
          <span className="text-sm font-semibold text-red-600 dark:text-red-400">
            {item.ingredientName}
          </span>
          <button
            onClick={() => onRemoveItem(item.id)}
            className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
