// Recipe-related TypeScript type definitions

export interface Ingredient {
    ingredientId: string;
    name: string;
    imageUrl?: string;
    quantity: string;
    unit?: string;
    isReady?: boolean;
}

export interface Instruction {
    id: string;
    instruction: string;
    isDone?: boolean;
}

export interface InitialPreparation {
    id: string;
    instruction: string;
    isDone?: boolean;
}

export interface KitchenTool {
    toolId: string;
    toolName: string;
    imageUrl: string;
    isReady?: boolean;
}

export interface Nutrition {
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
}

export type ExperienceLevel = "newBie" | "canCook" | "expert";

export interface Recipe {
    recipeId: string;
    generatedBy: string;
    recipeName: string;
    ingredients: Ingredient[];
    steps: Instruction[];
    initialPreparation: InitialPreparation[];
    kitchenTools: KitchenTool[];
    experienceLevel: ExperienceLevel;
    estCookingTime: string;
    description: string;
    mealType: string;
    cuisine: string;
    calorie: number;
    images: string[];
    nutrition?: Nutrition;
    servings: number;
    likes: string[];
    isPublic: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface RecipeResponse {
    success: boolean;
    message?: string;
    data: Recipe[];
}
