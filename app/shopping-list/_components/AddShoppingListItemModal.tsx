"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { X, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_INGREDIENTS, IngredientModel } from "@/data/mockIngredients";
import { ITEM_UNITS } from "@/lib/types/shopping-list.type";

interface AddShoppingListItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    ingredientId: string;
    quantity: string;
    unit: string;
    category: string;
  }) => void;
}

export const AddShoppingListItemModal = ({
  isOpen,
  onClose,
  onConfirm,
}: AddShoppingListItemModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredient, setSelectedIngredient] =
    useState<IngredientModel | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("unit");

  const filteredIngredients = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_INGREDIENTS;
    return MOCK_INGREDIENTS.filter((ing) =>
      ing.ingredientName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const handleConfirm = () => {
    if (!selectedIngredient) return;

    onConfirm({
      ingredientId: selectedIngredient.id,
      quantity,
      unit,
      category: "none",
    });

    // Reset
    setSelectedIngredient(null);
    setQuantity("1");
    setUnit("unit");
    setSearchQuery("");
    onClose();
  };

  const handleClose = () => {
    setSelectedIngredient(null);
    setQuantity("1");
    setUnit("unit");
    setSearchQuery("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-[28px] sm:rounded-[24px] overflow-hidden shadow-2xl h-[85vh] sm:h-[600px] flex flex-col animate-in slide-in-from-bottom-10 duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 shrink-0">
          <div className="flex flex-col">
            <span className="w-12 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full mb-3 self-center sm:hidden mx-auto" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Add Shopping List Item
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Selected Item with Quantity/Unit */}
        {selectedIngredient && (
          <div className="px-4 py-3 bg-orange-50 dark:bg-orange-950/30 border-b border-orange-100 dark:border-orange-800/40 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700">
                <Image
                  src={
                    selectedIngredient.prefixImage || "/placeholder-food.png"
                  }
                  alt={selectedIngredient.ingredientName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="font-semibold text-orange-900 dark:text-orange-300">
                {selectedIngredient.ingredientName}
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                step="0.5"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Qty"
                className="flex-1 px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 outline-none dark:text-gray-100"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="flex-1 px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 outline-none dark:text-gray-100"
              >
                {ITEM_UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleConfirm}
              className="w-full mt-3 py-2.5 bg-orange-500 text-white rounded-xl font-semibold text-sm hover:bg-orange-600 active:scale-[0.98] transition-all"
            >
              Add to Shopping List
            </button>
          </div>
        )}

        {/* Search */}
        <div className="px-4 py-3 bg-white dark:bg-zinc-900 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search: egg, chicken..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-100 dark:bg-zinc-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium dark:text-gray-100"
            />
          </div>
        </div>

        {/* Ingredient List */}
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <div className="space-y-2 mt-2">
            {filteredIngredients.map((ing) => {
              const isSelected = selectedIngredient?.id === ing.id;
              return (
                <div
                  key={ing.id}
                  onClick={() => setSelectedIngredient(isSelected ? null : ing)}
                  className={cn(
                    "flex items-center p-2 rounded-xl border transition-all cursor-pointer active:scale-[0.99]",
                    isSelected
                      ? "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/40"
                      : "bg-white dark:bg-zinc-800 border-gray-100 dark:border-zinc-700 hover:border-gray-200 dark:hover:border-zinc-600 hover:shadow-sm",
                  )}
                >
                  <div className="relative w-10 h-10 bg-white dark:bg-zinc-700 rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-600 shrink-0">
                    <Image
                      src={ing.prefixImage || "/placeholder-food.png"}
                      alt={ing.ingredientName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <h4
                      className={cn(
                        "font-semibold text-sm",
                        isSelected
                          ? "text-orange-900 dark:text-orange-300"
                          : "text-gray-700 dark:text-gray-200",
                      )}
                    >
                      {ing.ingredientName}
                    </h4>
                  </div>
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center border transition-all",
                      isSelected
                        ? "bg-orange-500 border-orange-500"
                        : "border-gray-300 dark:border-zinc-600",
                    )}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
              );
            })}

            {filteredIngredients.length === 0 && (
              <div className="text-center py-10 text-gray-400 dark:text-gray-500">
                <p>
                  No ingredients found for &quot;{searchQuery}
                  &quot;
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-zinc-800 sm:hidden">
          <button
            onClick={handleClose}
            className="w-full py-3 text-center text-gray-500 dark:text-gray-400 font-semibold active:text-gray-700 dark:active:text-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
