
export const API = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        GOOGLE: "/auth/google",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: (token: string) => `/auth/reset-password/${token}`,
    },
    USERS: {
        GET_ONE: (uid: string) => `/user/${uid}`,
        UPDATE: (uid: string) => `/users/${uid}`,
        UPLOAD_PROFILE_PIC: (uid: string) => `/users/${uid}/profile-pic`,
    },
    COOKBOOK: {
        CHECK: (userId: string, originalRecipeId: string) => `/cookbook/${userId}/check/${originalRecipeId}`,
        GET_BY_ORIGINAL: (userId: string, originalRecipeId: string) => `/cookbook/${userId}/original/${originalRecipeId}`,
        ADD: '/cookbook/add',
        UPDATE_RECIPE: (userRecipeId: string) => `/cookbook/recipe/${userRecipeId}`,
        REMOVE: (userRecipeId: string) => `/cookbook/recipe/${userRecipeId}`,
    },
    RECIPES: {
        PUBLIC: '/publicRecipes',
        ALL: '/allRecipes',
        SAVE: '/saveRecipe',
        GET_ONE: (recipeId: string) => `/recipe/${recipeId}`,
        UPDATE: (recipeId: string) => `/recipe/${recipeId}`,
        UPLOAD_IMAGES: (recipeId: string) => `/recipe/${recipeId}/images`,
        TOGGLE_SAVE: (recipeId: string) => `/recipe/${recipeId}/save`,
    },
}
