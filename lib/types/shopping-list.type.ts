// Shopping List TypeScript type definitions

export interface ShoppingListItem {
    itemId: string;
    userId: string;
    quantity: string;
    unit: string;
    category: string;
    isChecked: boolean;
    ingredientId: string;
    createdAt: string;
    updatedAt: string;
}

export interface AddShoppingListItemRequest {
    quantity: string;
    unit: string;
    category?: string;
    ingredientId?: string;
}

export interface UpdateShoppingListItemRequest {
    quantity?: string;
    unit?: string;
    category?: string;
    isChecked?: boolean;
    ingredientId?: string;
}

export interface ShoppingListResponse {
    success: boolean;
    message?: string;
    data: ShoppingListItem[] | ShoppingListItem;
}

export const SHOPPING_LIST_CATEGORIES = [
    { label: "All", value: "any" },
    { label: "Fruits", value: "fruits" },
    { label: "Vegetables", value: "vegetables" },
    { label: "Dairy", value: "dairy" },
    { label: "Meat", value: "meat" },
    { label: "Grains", value: "grains" },
    { label: "Spices", value: "spices" },
    { label: "Other", value: "other" },
] as const;

export const ITEM_UNITS = [
    "unit", "kg", "g", "lb", "oz", "ml", "l", "cup", "tbsp", "tsp", "piece", "bunch", "can", "bottle", "pack"
] as const;
