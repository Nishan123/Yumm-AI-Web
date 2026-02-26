"use client";

import { useMemo } from "react";
import { ShoppingListItem } from "@/lib/types/shopping-list.type";
import { IngredientModel, MOCK_INGREDIENTS } from "@/data/mockIngredients";

/**
 * Derives pantry inventory from shopping list items.
 * Filters items where isChecked === true, then maps each ingredientId
 * to the local ingredients JSON for name and image data.
 *
 * Mirrors the Flutter pantryInventoryProvider logic.
 */
export function usePantryInventory(shoppingListItems: ShoppingListItem[]): IngredientModel[] {
    const pantryItems = useMemo(() => {
        // Build lookup map from ingredient id -> IngredientModel
        const lookupMap = new Map<string, IngredientModel>();
        for (const ing of MOCK_INGREDIENTS) {
            lookupMap.set(ing.id, ing);
        }

        // Filter checked items and map to IngredientModel
        return shoppingListItems
            .filter((item) => item.isChecked && item.ingredientId)
            .map((item) => {
                const ingredient = lookupMap.get(item.ingredientId);
                return {
                    id: item.ingredientId,
                    ingredientName: ingredient?.ingredientName ?? "Unknown Item",
                    prefixImage: ingredient?.prefixImage ?? "",
                    quantity: item.quantity,
                    unit: item.unit,
                };
            })
            .filter((item) => item.ingredientName !== "Unknown Item");
    }, [shoppingListItems]);

    return pantryItems;
}
