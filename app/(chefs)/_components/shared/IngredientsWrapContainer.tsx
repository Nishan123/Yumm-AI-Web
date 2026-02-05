"use client";

import React from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { IngredientModel } from "@/data/mockIngredients";

interface IngredientsWrapContainerProps {
  items: IngredientModel[];
  onRemoveItem: (id: string) => void;
  haveAddIngredientButton?: boolean;
  onAddIngredientButtonPressed?: () => void;
}

export const IngredientsWrapContainer = ({
  items,
  onRemoveItem,
  haveAddIngredientButton = false,
  onAddIngredientButtonPressed,
}: IngredientsWrapContainerProps) => {
  return (
    <div className="w-full px-4">
      <div className="flex flex-wrap gap-2">
        {haveAddIngredientButton && (
          <button
            onClick={onAddIngredientButtonPressed}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all active:scale-95"
          >
            <Plus className="w-6 h-6 text-gray-400 hover:text-orange-500" />
          </button>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full pl-2 pr-3 py-1.5 animate-in fade-in zoom-in duration-200"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
              {/* 
                  Using simple img tag with fallback or Next Image if URLs are valid.
                  For safety with mock data urls (placeholders), Image might complain if domain not allowed.
                  We added external domain, so should be fine.
               */}
              <Image
                src={item.prefixImage || "/placeholder-food.png"}
                alt={item.ingredientName}
                fill
                className="object-cover"
                unoptimized // Use unoptimized for random external placeholder URLs if needed to avoid nextjs optimization errors
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {item.ingredientName}
            </span>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="ml-1 p-0.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {items.length === 0 && !haveAddIngredientButton && (
          <div className="w-full text-center py-4 text-gray-400 text-sm">
            No ingredients selected
          </div>
        )}
      </div>
    </div>
  );
};
