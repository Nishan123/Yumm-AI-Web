import ingredientsData from '@/public/ingridents.json';

export interface IngredientModel {
    id: string;
    ingredientName: string;
    prefixImage: string;
    quantity?: string;
    unit?: string;
}

export const MOCK_INGREDIENTS: IngredientModel[] = (ingredientsData as any[]).map((ing) => ({
    id: ing.id,
    ingredientName: ing.ingredientName,
    prefixImage: ing.prefixImage,
    quantity: "1",
    unit: "unit",
}));
