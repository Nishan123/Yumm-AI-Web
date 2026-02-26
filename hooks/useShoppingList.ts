"use client";

import { useState, useCallback, useRef } from "react";
import { ShoppingListItem, AddShoppingListItemRequest } from "@/lib/types/shopping-list.type";
import {
    getShoppingListAction,
    addShoppingListItemAction,
    updateShoppingListItemAction,
    deleteShoppingListItemAction,
} from "@/lib/actions/shopping-list-action";

interface UseShoppingListReturn {
    items: ShoppingListItem[];
    isLoading: boolean;
    error: string | null;
    fetchItems: (category?: string) => Promise<void>;
    addItem: (data: AddShoppingListItemRequest) => Promise<boolean>;
    toggleChecked: (item: ShoppingListItem) => Promise<void>;
    deleteItem: (itemId: string) => Promise<void>;
}

export function useShoppingList(): UseShoppingListReturn {
    const [items, setItems] = useState<ShoppingListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    const fetchItems = useCallback(async (category?: string) => {
        setIsLoading(true);
        setError(null);

        const result = await getShoppingListAction(category);
        if (result.success && result.data) {
            setItems(result.data as ShoppingListItem[]);
        } else {
            setError(result.message || "Failed to load shopping list");
        }
        setIsLoading(false);
        hasFetched.current = true;
    }, []);

    const addItem = useCallback(async (data: AddShoppingListItemRequest): Promise<boolean> => {
        const result = await addShoppingListItemAction(data);
        if (result.success && result.data) {
            setItems((prev) => [result.data as ShoppingListItem, ...prev]);
            return true;
        }
        setError(result.message || "Failed to add item");
        return false;
    }, []);

    const toggleChecked = useCallback(async (item: ShoppingListItem) => {
        // Optimistic update
        setItems((prev) =>
            prev.map((i) =>
                i.itemId === item.itemId ? { ...i, isChecked: !i.isChecked } : i
            )
        );

        const result = await updateShoppingListItemAction(item.itemId, {
            isChecked: !item.isChecked,
        });

        if (!result.success) {
            // Revert on failure
            setItems((prev) =>
                prev.map((i) =>
                    i.itemId === item.itemId ? { ...i, isChecked: item.isChecked } : i
                )
            );
            setError(result.message || "Failed to update item");
        }
    }, []);

    const deleteItem = useCallback(async (itemId: string) => {
        // Optimistic removal
        const previousItems = items;
        setItems((prev) => prev.filter((i) => i.itemId !== itemId));

        const result = await deleteShoppingListItemAction(itemId);
        if (!result.success) {
            // Revert on failure
            setItems(previousItems);
            setError(result.message || "Failed to delete item");
        }
    }, [items]);

    return {
        items,
        isLoading,
        error,
        fetchItems,
        addItem,
        toggleChecked,
        deleteItem,
    };
}
