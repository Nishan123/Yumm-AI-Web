import { shoppingListApi } from "../api/shopping-list";
import { AddShoppingListItemRequest, UpdateShoppingListItemRequest } from "../types/shopping-list.type";

export const getShoppingListAction = async (category?: string) => {
    try {
        const response = await shoppingListApi.getItems(category);
        return { success: true, data: response.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch shopping list",
        };
    }
};

export const addShoppingListItemAction = async (data: AddShoppingListItemRequest) => {
    try {
        const response = await shoppingListApi.addItem(data);
        return { success: true, data: response.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to add item",
        };
    }
};

export const updateShoppingListItemAction = async (
    itemId: string,
    data: UpdateShoppingListItemRequest
) => {
    try {
        const response = await shoppingListApi.updateItem(itemId, data);
        return { success: true, data: response.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to update item",
        };
    }
};

export const deleteShoppingListItemAction = async (itemId: string) => {
    try {
        await shoppingListApi.deleteItem(itemId);
        return { success: true };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to delete item",
        };
    }
};
