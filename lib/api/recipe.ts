import api from "./axios";
import { API } from "./endpoints";
import { Recipe, RecipeResponse } from "../types/recipe.type";

export const recipeApi = {
    /**
     * Fetch all public recipes from the server
     * Endpoint: GET /publicRecipes
     */
    getPublicRecipes: async (): Promise<Recipe[]> => {
        const response = await api.get<RecipeResponse>(API.RECIPES.PUBLIC);

        if (response.data.success) {
            return response.data.data.recipe;
        }

        throw new Error(response.data.message || "Failed to fetch public recipes");
    },


    /**
     * Save a generated recipe
     * Endpoint: POST /saveRecipe
     */
    saveRecipe: async (recipe: Recipe): Promise<Recipe> => {
        const response = await api.post<RecipeResponse>(API.RECIPES.SAVE, recipe);

        if (response.data.success) {
            return response.data.data.recipe[0] || response.data.data.recipe; // Handle if array or single obj returned
        }

        throw new Error(response.data.message || "Failed to save recipe");
    },

    /**
     * Upload recipe images
     * Endpoint: POST /recipe/:recipeId/images
     */
    uploadRecipeImages: async (recipeId: string, formData: FormData): Promise<string[]> => {
        const response = await api.post<{ success: boolean; data: { images: string[] }; message: string }>(
            API.RECIPES.UPLOAD_IMAGES(recipeId),
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
        const response = await api.get<RecipeResponse>(API.RECIPES.GET_ONE(recipeId));

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
        const response = await api.put<RecipeResponse>(API.RECIPES.UPDATE(recipe.recipeId), recipe);

        if (response.data.success) {
            return response.data.data.recipe[0] || response.data.data.recipe;
        }

        throw new Error(response.data.message || "Failed to update recipe");
    },

    /**
     * Toggle save/like status of a recipe
     * Endpoint: POST /recipe/:recipeId/save
     */
    toggleSaveRecipe: async (recipeId: string): Promise<Recipe> => {
        const response = await api.post<RecipeResponse>(API.RECIPES.TOGGLE_SAVE(recipeId));

        if (response.data.success) {
            return response.data.data as unknown as Recipe;
        }

        throw new Error(response.data.message || "Failed to update recipe save status");
    },
};
