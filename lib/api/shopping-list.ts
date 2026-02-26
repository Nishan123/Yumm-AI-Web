import api from "./axios";
import { API } from "./endpoints";
import {
    ShoppingListItem,
    AddShoppingListItemRequest,
    UpdateShoppingListItemRequest,
} from "../types/shopping-list.type";

export const shoppingListApi = {
    getItems: async (category?: string): Promise<{ success: boolean; data: ShoppingListItem[] }> => {
        const params = category && category !== "any" ? { category } : {};
        const response = await api.get(API.SHOPPING_LIST.GET_ALL, { params });
        return response.data;
    },

    addItem: async (data: AddShoppingListItemRequest): Promise<{ success: boolean; data: ShoppingListItem }> => {
        const response = await api.post(API.SHOPPING_LIST.ADD, data);
        return response.data;
    },

    updateItem: async (
        itemId: string,
        data: UpdateShoppingListItemRequest
    ): Promise<{ success: boolean; data: ShoppingListItem }> => {
        const response = await api.put(API.SHOPPING_LIST.UPDATE(itemId), data);
        return response.data;
    },

    deleteItem: async (itemId: string): Promise<{ success: boolean }> => {
        const response = await api.delete(API.SHOPPING_LIST.DELETE(itemId));
        return response.data;
    },
};
