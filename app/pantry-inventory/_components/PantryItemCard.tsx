"use client";

import React from "react";
import Image from "next/image";
import { IngredientModel } from "@/data/mockIngredients";

interface PantryItemCardProps {
  item: IngredientModel;
}

export const PantryItemCard = ({ item }: PantryItemCardProps) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">
      {/* Image */}
      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 shrink-0">
        {item.prefixImage ? (
          <Image
            src={item.prefixImage}
            alt={item.ingredientName}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-zinc-600 text-xs">
            N/A
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
          {item.ingredientName}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {item.quantity} {item.unit}
        </p>
      </div>

      {/* Ready indicator */}
      <div className="w-3 h-3 rounded-full bg-green-400 shrink-0" />
    </div>
  );
};
