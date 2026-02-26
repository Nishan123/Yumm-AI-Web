"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Package } from "lucide-react";
import { useShoppingList } from "@/hooks/useShoppingList";
import { MOCK_INGREDIENTS, IngredientModel } from "@/data/mockIngredients";
import { ShoppingListItem } from "@/lib/types/shopping-list.type";
import { AddShoppingListItemModal } from "./_components/AddShoppingListItemModal";
import { ShoppingListTile } from "./_components/ShoppingListTile";
import { CategoryChips } from "./_components/CategoryChips";
import { toast } from "sonner";
import { useAuth } from "@/lib/context/auth-context";

export default function ShoppingListPage() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    items,
    isLoading,
    error,
    fetchItems,
    addItem,
    toggleChecked,
    deleteItem,
  } = useShoppingList();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("any");

  // Build ingredient lookup map
  const lookupMap = useMemo(() => {
    const map = new Map<string, IngredientModel>();
    for (const ing of MOCK_INGREDIENTS) {
      map.set(ing.id, ing);
    }
    return map;
  }, []);

  useEffect(() => {
    if (user) {
      fetchItems(selectedCategory === "any" ? undefined : selectedCategory);
    }
  }, [user, selectedCategory, fetchItems]);

  const handleAddItem = async (data: {
    ingredientId: string;
    quantity: string;
    unit: string;
    category: string;
  }) => {
    const success = await addItem(data);
    if (success) {
      toast.success("Item added to shopping list!");
    } else {
      toast.error("Failed to add item");
    }
  };

  const handleDelete = async (itemId: string) => {
    await deleteItem(itemId);
    toast.success("Item removed");
  };

  const formatDaysAgo = (dateStr: string) => {
    if (!dateStr) return "0";
    const diff = Math.floor(
      (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff.toString();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Shopping List</h1>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:text-blue-700 dark:hover:text-blue-300"
          >
            Add Item
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto py-4 space-y-4">
        {/* Category Chips */}
        <CategoryChips
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Hint */}
        <div className="mx-4 px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/40 rounded-xl flex items-center gap-3">
          <Package className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
            Marked items will be saved in inventory
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-gray-200 dark:border-zinc-700 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20 px-4">
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() =>
                fetchItems(
                  selectedCategory === "any" ? undefined : selectedCategory,
                )
              }
              className="mt-3 text-blue-600 dark:text-blue-400 font-semibold text-sm"
            >
              Retry
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 px-4">
            <ShoppingCart className="w-16 h-16 text-gray-200 dark:text-zinc-700 mx-auto mb-4" />
            <p className="text-gray-400 dark:text-gray-500">
              No items in your shopping list.
              <br />
              Tap &apos;Add Item&apos; to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-2 px-4">
            {items.map((item) => {
              const ingredient = lookupMap.get(item.ingredientId);
              return (
                <ShoppingListTile
                  key={item.itemId}
                  item={item}
                  displayName={ingredient?.ingredientName ?? "Unknown Item"}
                  displayImage={ingredient?.prefixImage ?? ""}
                  daysAgo={formatDaysAgo(item.createdAt)}
                  onToggleChecked={toggleChecked}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        )}
      </div>

      <AddShoppingListItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddItem}
      />
    </div>
  );
}
