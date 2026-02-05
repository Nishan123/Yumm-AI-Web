import api from "./axios";
import { Recipe, RecipeResponse } from "../types/recipe.type";

export const recipeApi = {
    /**
     * Fetch all public recipes from the server
     * Endpoint: GET /publicRecipes
     */
    getPublicRecipes: async (): Promise<Recipe[]> => {
        const response = await api.get<RecipeResponse>("/publicRecipes");

        if (response.data.success) {
            return response.data.data;
        }

        throw new Error(response.data.message || "Failed to fetch public recipes");
    },

    /**
     * Fetch all recipes (admin use)
     * Endpoint: GET /allRecipes
     */
    getAllRecipes: async (): Promise<Recipe[]> => {
        const response = await api.get<RecipeResponse>("/allRecipes");

        if (response.data.success) {
            return response.data.data;
        }

        throw new Error(response.data.message || "Failed to fetch all recipes");
    },

    /**
     * Save a generated recipe
     * Endpoint: POST /saveRecipe
     */
    saveRecipe: async (recipe: Recipe): Promise<Recipe> => {
        const response = await api.post<RecipeResponse>("/saveRecipe", recipe);

        if (response.data.success) {
            return response.data.data[0] || response.data.data; // Handle if array or single obj returned
        }

        throw new Error(response.data.message || "Failed to save recipe");
    },

    /**
     * Upload recipe images
     * Endpoint: POST /recipe/:recipeId/images
     */
    uploadRecipeImages: async (recipeId: string, formData: FormData): Promise<string[]> => {
        const response = await api.post<{ success: boolean; data: { images: string[] }; message: string }>(
            `/recipe/${recipeId}/images`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.data.success) {
            return response.data.data.images;
        }

        throw new Error(response.data.message || "Failed to upload images");
    },

    /**
     * Get a single recipe by ID
     * Endpoint: GET /recipe/:recipeId
     */
    getRecipe: async (recipeId: string): Promise<Recipe> => {
        const response = await api.get<RecipeResponse>(`/recipe/${recipeId}`);

        if (response.data.success) {
            // The API might return an array or single object depending on implementation
            // Based on controller: sendSuccess(res, recipe); -> likely single object
            return response.data.data as unknown as Recipe;
        }

        throw new Error(response.data.message || "Failed to fetch recipe");
    },
    /**
     * Update a recipe
     * Endpoint: PUT /recipe/:recipeId
     */
    updateRecipe: async (recipe: Recipe): Promise<Recipe> => {
        const response = await api.put<RecipeResponse>(`/recipe/${recipe.recipeId}`, recipe);

        if (response.data.success) {
            return response.data.data[0] || response.data.data;
        }

        throw new Error(response.data.message || "Failed to update recipe");
    },

    /**
     * Toggle save/like status of a recipe
     * Endpoint: POST /recipe/:recipeId/save
     */
    toggleSaveRecipe: async (recipeId: string): Promise<Recipe> => {
        const response = await api.post<RecipeResponse>(`/recipe/${recipeId}/save`);

        if (response.data.success) {
            return response.data.data as unknown as Recipe;
        }

        throw new Error(response.data.message || "Failed to update recipe save status");
    },
};
