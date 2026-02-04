import api from "./api";
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
};
