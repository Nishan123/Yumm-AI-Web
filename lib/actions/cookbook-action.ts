"use server";

import { revalidatePath } from "next/cache";
import api from "../api/axios";
import { API } from "../api/endpoints";
import { UserRecipe, UserRecipeResponse } from "../types/cookbook.type";
import { getAuthToken } from "../cookie";

const getHeaders = async () => {
    const token = await getAuthToken();
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
};

/**
 * Full update a cookbook recipe (user's copy)
 */
export async function fullUpdateCookbookRecipeAction(
    userRecipeId: string,
    updates: Partial<UserRecipe>
): Promise<UserRecipe> {
    try {
        const config = await getHeaders();
        const response = await api.put<UserRecipeResponse>(
            API.COOKBOOK.FULL_UPDATE(userRecipeId),
            updates,
            config
        );

        if (response.data.success) {
            // Revalidate all relevant paths
            revalidatePath("/home");
            revalidatePath("/cook-book");
            revalidatePath("/cooking");
            return response.data.data;
        }
        throw new Error(response.data.message || "Failed to update cookbook recipe");
    } catch (error: any) {
        console.error("Error in fullUpdateCookbookRecipeAction:", error);
        throw new Error(
            error.response?.data?.message || error.message || "Failed to update cookbook recipe"
        );
    }
}

/**
 * Remove a recipe from the cookbook
 */
export async function removeFromCookbookAction(userRecipeId: string): Promise<void> {
    try {
        const config = await getHeaders();
        const response = await api.delete(API.COOKBOOK.REMOVE(userRecipeId), config);

        if (response.data.success) {
            // Revalidate all relevant paths
            revalidatePath("/home");
            revalidatePath("/cook-book");
            revalidatePath("/cooking");
            return;
        }
        throw new Error(response.data.message || "Failed to remove from cookbook");
    } catch (error: any) {
        console.error("Error in removeFromCookbookAction:", error);
        throw new Error(
            error.response?.data?.message || error.message || "Failed to remove from cookbook"
        );
    }
}

/**
 * Get all recipes in the user's cookbook with pagination
 */
export async function getCookbookAction(
    userId: string,
    page?: number,
    size?: number,
    searchTerm?: string
): Promise<{ recipes: UserRecipe[]; pagination: { page: number; size: number; total: number; totalPages: number } }> {
    try {
        const config = await getHeaders();
        const params = new URLSearchParams();
        if (page) params.append('page', page.toString());
        if (size) params.append('size', size.toString());
        if (searchTerm) params.append('searchTerm', searchTerm);

        const url = `${API.COOKBOOK.GET_ALL(userId)}${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await api.get<{
            success: boolean;
            message?: string;
            data: { recipes: UserRecipe[]; pagination: { page: number; size: number; total: number; totalPages: number } };
        }>(url, config);

        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.message || "Failed to fetch cookbook");
    } catch (error: any) {
        console.error("Error in getCookbookAction:", error);
        throw new Error(
            error.response?.data?.message || error.message || "Failed to fetch cookbook"
        );
    }
}
