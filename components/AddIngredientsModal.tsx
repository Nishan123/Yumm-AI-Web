"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { X, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import ingredientsData from "@/public/ingridents.json";

// Type definition for ingredient model
interface IngredientModel {
  id: string;
  ingredientName: string;
  prefixImage: string;
  quantity?: string;
  unit?: string;
}

// Convert JSON data to IngredientModel format
const MOCK_INGREDIENTS: IngredientModel[] = ingredientsData.map((ing) => ({
  ...ing,
  quantity: "1",
  unit: "unit",
}));

interface AddIngredientsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIngredients: IngredientModel[];
  onConfirm: (ingredients: IngredientModel[]) => void;
}

export const AddIngredientsModal = ({
  isOpen,
  onClose,
  selectedIngredients,
  onConfirm,
}: AddIngredientsModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  // Local state for selection within the modal before confirming
  const [localSelectedIds, setLocalSelectedIds] = useState<Set<string>>(
    new Set(selectedIngredients.map((i) => i.id)),
  );

  // Sync local state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setLocalSelectedIds(new Set(selectedIngredients.map((i) => i.id)));
      setSearchQuery("");
    }
  }, [isOpen, selectedIngredients]);

  const filteredIngredients = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_INGREDIENTS;
    return MOCK_INGREDIENTS.filter((ing) =>
      ing.ingredientName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const toggleSelection = (id: string) => {
    const newSet = new Set(localSelectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setLocalSelectedIds(newSet);
  };

  const handleConfirm = () => {
    const newSelection = MOCK_INGREDIENTS.filter((ing) =>
      localSelectedIds.has(ing.id),
    );
    onConfirm(newSelection);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Content */}
      <div className="w-full max-w-md bg-white rounded-t-[28px] sm:rounded-[24px] overflow-hidden shadow-2xl h-[85vh] sm:h-[600px] flex flex-col animate-in slide-in-from-bottom-10 duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex flex-col">
            <span className="w-12 h-1.5 bg-gray-200 rounded-full mb-3 self-center sm:hidden mx-auto" />
            <h2 className="text-xl font-bold text-gray-800">Add Ingredients</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleConfirm}
              className="text-orange-500 font-bold text-sm hover:text-orange-600 active:scale-95 transition-transform"
            >
              Done
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3 bg-white shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search: egg, chicken..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder:text-gray-400 font-medium"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <div className="space-y-2 mt-2">
            {filteredIngredients.map((ing) => {
              const isSelected = localSelectedIds.has(ing.id);
              return (
                <div
                  key={ing.id}
                  onClick={() => toggleSelection(ing.id)}
                  className={cn(
                    "flex items-center p-2 rounded-xl border transition-all cursor-pointer active:scale-[0.99]",
                    isSelected
                      ? "bg-orange-50 border-orange-200"
                      : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm",
                  )}
                >
                  <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden border border-gray-100 shrink-0">
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
                        isSelected ? "text-orange-900" : "text-gray-700",
                      )}
                    >
                      {ing.ingredientName}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {ing.quantity} {ing.unit}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center border transition-all",
                      isSelected
                        ? "bg-orange-500 border-orange-500"
                        : "border-gray-300",
                    )}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
              );
            })}

            {filteredIngredients.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <p>No ingredients found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer (Cancel/Close) */}
        <div className="p-4 border-t border-gray-100 sm:hidden">
          <button
            onClick={onClose}
            className="w-full py-3 text-center text-gray-500 font-semibold active:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
