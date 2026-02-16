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
    data: {
        recipe: Recipe[];
        pagination?: {
            page: number;
            size: number;
            total: number;
            totalPages: number;
        };
    };
}

// Search filter types — values match mobile enums and server expectations
export interface SearchFilters {
    experienceLevel?: string;
    mealType?: string;
    minCalorie?: number;
    maxCalorie?: number;
}

export const EXPERIENCE_LEVELS = [
    { label: "Newbie", value: "newBie" },
    { label: "Can Cook", value: "canCook" },
    { label: "Expert", value: "expert" },
] as const;

export const MEAL_TYPES = [
    { label: "Breakfast", value: "breakfast" },
    { label: "Dinner", value: "dinner" },
    { label: "Main Course", value: "main Course" },
    { label: "Snacks", value: "snacks" },
    { label: "Dessert", value: "dessert" },
    { label: "Hard Drinks", value: "hard Drinks" },
    { label: "Soft Drinks", value: "soft Drinks" },
] as const;

