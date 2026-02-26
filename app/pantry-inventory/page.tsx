"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";
import { useShoppingList } from "@/hooks/useShoppingList";
import { usePantryInventory } from "@/hooks/usePantryInventory";
import { useAuth } from "@/lib/context/auth-context";
import { PantryItemCard } from "./_components/PantryItemCard";

export default function PantryInventoryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, isLoading, error, fetchItems } = useShoppingList();
  const pantryItems = usePantryInventory(items);

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user, fetchItems]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Pantry Inventory</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-gray-200 dark:border-zinc-700 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20 px-4">
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() => fetchItems()}
              className="mt-3 text-blue-600 dark:text-blue-400 font-semibold text-sm"
            >
              Retry
            </button>
          </div>
        ) : pantryItems.length === 0 ? (
          <div className="text-center py-20 px-4">
            <Package className="w-16 h-16 text-gray-200 dark:text-zinc-700 mx-auto mb-4" />
            <p className="text-gray-400 dark:text-gray-500">
              No items in your pantry.
              <br />
              Mark items in your Shopping List to add them here.
            </p>
          </div>
        ) : (
          <div className="space-y-2 px-4">
            {pantryItems.map((item) => (
              <PantryItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
