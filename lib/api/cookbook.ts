import api from "./axios";
import { API } from "./endpoints";
import { UserRecipe, UserRecipeResponse, CheckCookbookResponse } from "../types/cookbook.type";

export const cookbookApi = {
    /**
     * Check if a recipe is in the user's cookbook
     */
    checkIsInCookbook: async (userId: string, originalRecipeId: string): Promise<boolean> => {
        try {
            const response = await api.get<CheckCookbookResponse>(API.COOKBOOK.CHECK(userId, originalRecipeId));
            if (response.data.success) {
                return response.data.data.isInCookbook;
            }
            return false;
        } catch (error) {
            console.error("Error checking cookbook status:", error);
            return false;
        }
    },

    /**
     * Get user's copy of a recipe
     */
    getUserRecipeByOriginal: async (userId: string, originalRecipeId: string): Promise<UserRecipe | null> => {
        try {
            const response = await api.get<UserRecipeResponse>(API.COOKBOOK.GET_BY_ORIGINAL(userId, originalRecipeId));
            if (response.data.success) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.error("Error fetching user recipe:", error);
            return null;
        }
    },

    /**
     * Add a recipe to the cookbook
     */
    addToCookbook: async (userId: string, recipeId: string): Promise<UserRecipe> => {
        const response = await api.post<UserRecipeResponse>(API.COOKBOOK.ADD, {
            userId,
            recipeId
        });

        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.message || "Failed to add to cookbook");
    },

    /**
     * Update a user recipe (progress)
     */
    updateUserRecipe: async (userRecipeId: string, updates: Partial<UserRecipe>): Promise<UserRecipe> => {
        const response = await api.put<UserRecipeResponse>(API.COOKBOOK.UPDATE_RECIPE(userRecipeId), updates);

        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.message || "Failed to update recipe progress");
    },

    /**
     * Remove from cookbook
     */
    removeFromCookbook: async (userRecipeId: string): Promise<void> => {
        const response = await api.delete(API.COOKBOOK.REMOVE(userRecipeId));
        if (!response.data.success) {
            throw new Error(response.data.message || "Failed to remove from cookbook");
        }
    },

    /**
     * Get all recipes in user's cookbook with pagination
     */
    getUserCookbook: async (
        userId: string,
        page?: number,
        size?: number,
        searchTerm?: string
    ): Promise<{ recipes: UserRecipe[]; pagination: { page: number; size: number; total: number; totalPages: number } }> => {
        try {
            const params = new URLSearchParams();
            if (page) params.append('page', page.toString());
            if (size) params.append('size', size.toString());
            if (searchTerm) params.append('searchTerm', searchTerm);

            const url = `${API.COOKBOOK.GET_ALL(userId)}${params.toString() ? `?${params.toString()}` : ''}`;
            const response = await api.get<{
                success: boolean;
                message?: string;
                data: { recipes: UserRecipe[]; pagination: { page: number; size: number; total: number; totalPages: number } };
            }>(url);
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message || "Failed to fetch cookbook");
        } catch (error: any) {
            console.error("Error fetching cookbook:", error);
            throw new Error(error.response?.data?.message || error.message || "Failed to fetch cookbook");
        }
    }
};
