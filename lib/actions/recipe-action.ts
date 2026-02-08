"use server";

import { revalidatePath } from "next/cache";
import api from "../api/axios";
import { API } from "../api/endpoints";
import { Recipe, RecipeResponse } from "../types/recipe.type";
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
 * Fetch all public recipes from the server
 */
export async function getPublicRecipesAction(): Promise<Recipe[]> {
    try {
        const response = await api.get<RecipeResponse>(API.RECIPES.PUBLIC);
        if (response.data.success) {
            return response.data.data.recipe;
        }
        throw new Error(response.data.message || "Failed to fetch public recipes");
    } catch (error: any) {
        console.error("Error in getPublicRecipesAction:", error);
        throw new Error(error.response?.data?.message || error.message || "Failed to fetch public recipes");
    }
}

/**
 * Get a single recipe by ID
 */
export async function getRecipeAction(recipeId: string): Promise<Recipe> {
    try {
        const config = await getHeaders();
        const response = await api.get<RecipeResponse>(API.RECIPES.GET_ONE(recipeId), config);

        if (response.data.success) {
            return response.data.data as unknown as Recipe;
        }
        throw new Error(response.data.message || "Failed to fetch recipe");
    } catch (error: any) {
        console.error("Error in getRecipeAction:", error);
        throw new Error(error.response?.data?.message || error.message || "Failed to fetch recipe");
    }
}

/**
 * Toggle save/like status of a recipe
 */
export async function toggleSaveRecipeAction(recipeId: string): Promise<Recipe> {
    try {
        console.log("toggleSaveRecipeAction called with ID:", recipeId);
        // Reverting to simple call to match client-side logic and rely on interceptor
        const response = await api.post<RecipeResponse>(API.RECIPES.TOGGLE_SAVE(recipeId));

        if (response.data.success) {
            revalidatePath("/cooking");
            revalidatePath("/home");
            revalidatePath(`/cooking?recipeId=${recipeId}`);
            return response.data.data as unknown as Recipe;
        }
        throw new Error(response.data.message || "Failed to update recipe save status");
    } catch (error: any) {
        console.error("Error in toggleSaveRecipeAction:", error);
        if (error.response) {
            console.error("Error response status:", error.response.status);
            console.error("Error response data:", JSON.stringify(error.response.data, null, 2));
        }
        throw new Error(error.response?.data?.message || error.message || "Failed to update recipe save status");
    }
}

/**
 * Save a generated recipe
 */
export async function saveRecipeAction(recipe: Recipe): Promise<Recipe> {
    try {
        const config = await getHeaders();
        const response = await api.post<RecipeResponse>(API.RECIPES.SAVE, recipe, config);

        if (response.data.success) {
            revalidatePath("/home");
            return response.data.data.recipe[0] || response.data.data.recipe;
        }
        throw new Error(response.data.message || "Failed to save recipe");
    } catch (error: any) {
        console.error("Error in saveRecipeAction:", error);
        throw new Error(error.response?.data?.message || error.message || "Failed to save recipe");
    }
}

/**
 * Update a recipe
 */
export async function updateRecipeAction(recipe: Recipe): Promise<Recipe> {
    try {
        const config = await getHeaders();
        const response = await api.put<RecipeResponse>(API.RECIPES.UPDATE(recipe.recipeId), recipe, config);

        if (response.data.success) {
            revalidatePath(`/cooking?recipeId=${recipe.recipeId}`);
            return response.data.data.recipe[0] || response.data.data.recipe;
        }
        throw new Error(response.data.message || "Failed to update recipe");
    } catch (error: any) {
        console.error("Error in updateRecipeAction:", error);
        throw new Error(error.response?.data?.message || error.message || "Failed to update recipe");
    }
}

/**
 * Upload recipe images
 */
export async function uploadRecipeImagesAction(recipeId: string, formData: FormData): Promise<string[]> {
    try {
        const token = await getAuthToken();
        const response = await api.post<{ success: boolean; data: { images: string[] }; message: string }>(
            API.RECIPES.UPLOAD_IMAGES(recipeId),
            formData,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            }
        );

        if (response.data.success) {
            return response.data.data.images;
        }
        throw new Error(response.data.message || "Failed to upload images");
    } catch (error: any) {
        console.error("Error in uploadRecipeImagesAction:", error);
        throw new Error(error.response?.data?.message || error.message || "Failed to upload images");
    }
}

/**
 * Fetch all recipes (admin use)
 */
export async function getAllRecipesAction(): Promise<Recipe[]> {
    try {
        const config = await getHeaders();
        const response = await api.get<RecipeResponse>(API.RECIPES.ALL, config);

        if (response.data.success) {
            return response.data.data.recipe;
        }
        throw new Error(response.data.message || "Failed to fetch all recipes");
    } catch (error: any) {
        console.error("Error in getAllRecipesAction:", error);
        throw new Error(error.response?.data?.message || error.message || "Failed to fetch all recipes");
    }
}
