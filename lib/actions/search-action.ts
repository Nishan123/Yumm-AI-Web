"use server";

import api from "../api/axios";
import { API } from "../api/endpoints";
import { Recipe, RecipeResponse, SearchFilters } from "../types/recipe.type";

export interface SearchParams {
    searchTerm: string;
    page?: number;
    size?: number;
    filters?: SearchFilters;
}


export async function searchRecipesAction(
    params: SearchParams
): Promise<{ recipes: Recipe[]; pagination: { page: number; size: number; total: number; totalPages: number } }> {
    try {
        const { searchTerm, page = 1, size = 10, filters } = params;

        const queryParams: Record<string, string | number> = {
            searchTerm,
            page,
            size,
        };

        if (filters?.experienceLevel) {
            queryParams.experienceLevel = filters.experienceLevel;
        }
        if (filters?.mealType) {
            queryParams.mealType = filters.mealType;
        }
        if (filters?.minCalorie !== undefined && filters?.minCalorie !== null) {
            queryParams.minCalorie = filters.minCalorie;
        }
        if (filters?.maxCalorie !== undefined && filters?.maxCalorie !== null) {
            queryParams.maxCalorie = filters.maxCalorie;
        }

        const queryString = Object.entries(queryParams)
            .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
            .join("&");

        const response = await api.get<RecipeResponse>(
            `${API.RECIPES.PUBLIC}?${queryString}`
        );

        if (response.data.success) {
            return {
                recipes: response.data.data.recipe,
                pagination: response.data.data.pagination || {
                    page,
                    size,
                    total: 0,
                    totalPages: 0,
                },
            };
        }
        throw new Error(response.data.message || "Failed to search recipes");
    } catch (error: any) {
        console.error("Error in searchRecipesAction:", error);
        throw new Error(
            error.response?.data?.message || error.message || "Failed to search recipes"
        );
    }
}
