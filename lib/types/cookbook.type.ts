import { Recipe } from "./recipe.type";

export interface UserRecipe extends Recipe {
    userRecipeId: string;
    userId: string;
    originalRecipeId: string;
    originalGeneratedBy: string;
    addedAt: string;
}

export interface UserRecipeResponse {
    success: boolean;
    message?: string;
    data: UserRecipe;
}

export interface CheckCookbookResponse {
    success: boolean;
    message?: string;
    data: {
        isInCookbook: boolean;
    };
}
