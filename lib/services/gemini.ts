import { GoogleGenerativeAI } from "@google/generative-ai";
import { Recipe } from "@/lib/types/recipe.type";
import { IngredientModel } from "@/data/mockIngredients";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || process.env.GOOGLE_AI_API_KEY || "";

// Initialize the Gemini API lazily to avoid issues with env vars not being loaded
let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "";
    if (!apiKey) {
      throw new Error("Google AI API Key is missing. Please check your environment variables.");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export interface GenerateRecipeParams {
  prompt: string;
  selectedIngredients: IngredientModel[];
  masterIngredients: IngredientModel[];
  experienceLevel?: string;
}

/**
 * Generates a recipe using Gemini AI
 */
export async function generateRecipeWithGemini({
  prompt,
  selectedIngredients,
  masterIngredients,
  experienceLevel,
}: GenerateRecipeParams): Promise<Recipe> {
  console.log("Starting recipe generation...");

  const ai = getGenAI();
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  console.log("Sending prompt to Gemini...");
  const result = await model.generateContent(prompt);
  const response = await result.response;
  let jsonString = response.text();

  console.log("Received response from Gemini");

  if (!jsonString) {
    throw new Error("Failed to generate recipe - empty response from AI");
  }

  // Clean up the JSON string
  if (jsonString.includes("```json")) {
    jsonString = jsonString.replace(/```json/g, "").replace(/```/g, "");
  } else if (jsonString.includes("```")) {
    jsonString = jsonString.replace(/```/g, "");
  }

  jsonString = jsonString.trim();

  console.log("Parsing recipe JSON...");

  // Parse the JSON response
  let recipeJson;
  try {
    recipeJson = JSON.parse(jsonString);
  } catch (parseError) {
    console.error("Failed to parse JSON:", jsonString.substring(0, 500));
    throw new Error("Failed to parse recipe response from AI");
  }

  // Map ingredients from AI response to real ingredient data
  const mappedIngredients = mapIngredientsFromAiResponse(
    recipeJson.ingredients || [],
    selectedIngredients,
    masterIngredients
  );

  // Build the recipe object matching our Recipe type
  const recipe: Recipe = {
    recipeId: recipeJson.recipeId || generateUUID(),
    generatedBy: "", // Will be set when saving
    recipeName: recipeJson.recipeName || "",
    ingredients: mappedIngredients,
    steps: (recipeJson.steps || []).map((step: any, index: number) => ({
      id: step.id || `step-${index + 1}`,
      instruction: step.instruction || "",
      isDone: false,
    })),
    initialPreparation: (recipeJson.initialPreparation || []).map((prep: any, index: number) => ({
      id: prep.id || `prep-${index + 1}`,
      instruction: prep.instruction || "",
      isDone: false,
    })),
    kitchenTools: (recipeJson.kitchenTools || []).map((tool: any) => ({
      toolId: tool.toolId || "",
      toolName: tool.toolName || "",
      imageUrl: tool.imageUrl || "",
      isReady: false,
    })),
    experienceLevel: experienceLevel ? sanitizeExperienceLevel(experienceLevel) : sanitizeExperienceLevel(recipeJson.experienceLevel),
    estCookingTime: recipeJson.estCookingTime || "",
    description: recipeJson.description || "",
    mealType: recipeJson.mealType || "",
    cuisine: recipeJson.cuisine || "",
    calorie: typeof recipeJson.calorie === "number" ? recipeJson.calorie : 0,
    images: recipeJson.images || [],
    nutrition: recipeJson.nutrition
      ? {
        protein: recipeJson.nutrition.protein,
        carbs: recipeJson.nutrition.carbs,
        fat: recipeJson.nutrition.fat,
        fiber: recipeJson.nutrition.fiber,
      }
      : undefined,
    servings: typeof recipeJson.servings === "number" ? recipeJson.servings : 1,
    likes: [],
    isPublic: true,
  };

  return recipe;
}

/**
 * Maps ingredients from AI response to real ingredient data
 */
function mapIngredientsFromAiResponse(
  aiIngredients: any[],
  referenceIngredients: IngredientModel[],
  masterIngredients: IngredientModel[]
) {
  return aiIngredients.map((aiIng: any) => {
    const aiId = aiIng.id || "";
    const aiIngredientName = (aiIng.ingredientName || "").trim();
    const quantity = aiIng.quantity?.toString() || "As needed";
    const unit = aiIng.unit || "";

    // 1. Try to find by id in reference ingredients (selected by user)
    if (aiId) {
      const matchById = referenceIngredients.find((ing) => ing.id === aiId);
      if (matchById) {
        return {
          ingredientId: matchById.id,
          name: matchById.ingredientName,
          imageUrl: matchById.prefixImage,
          quantity,
          unit,
          isReady: false,
        };
      }
    }

    // 2. Try to find by name in reference ingredients
    if (aiIngredientName) {
      const matchByName = referenceIngredients.find(
        (ing) => ing.ingredientName.toLowerCase() === aiIngredientName.toLowerCase()
      );
      if (matchByName) {
        return {
          ingredientId: matchByName.id,
          name: matchByName.ingredientName,
          imageUrl: matchByName.prefixImage,
          quantity,
          unit,
          isReady: false,
        };
      }
    }

    // 3. Try to find by id in master ingredients list
    if (aiId) {
      const matchMasterById = masterIngredients.find((ing) => ing.id === aiId);
      if (matchMasterById) {
        return {
          ingredientId: matchMasterById.id,
          name: matchMasterById.ingredientName,
          imageUrl: matchMasterById.prefixImage,
          quantity,
          unit,
          isReady: false,
        };
      }
    }

    // 4. Try to find by name in master ingredients list
    if (aiIngredientName) {
      const matchMasterByName = masterIngredients.find(
        (ing) => ing.ingredientName.toLowerCase() === aiIngredientName.toLowerCase()
      );
      if (matchMasterByName) {
        return {
          ingredientId: matchMasterByName.id,
          name: matchMasterByName.ingredientName,
          imageUrl: matchMasterByName.prefixImage,
          quantity,
          unit,
          isReady: false,
        };
      }
    }

    // 5. Fallback - create ingredient with AI data
    return {
      ingredientId: aiId || generateUUID(),
      name: aiIngredientName,
      imageUrl: "",
      quantity,
      unit,
      isReady: false,
    };
  });
}

/**
 * Generates a simple UUID
 */
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Sanitizes the experience level to ensure it matches the allowed enum values.
 */
function sanitizeExperienceLevel(level: string): "newBie" | "canCook" | "expert" {
  if (!level) return "canCook";

  const normalized = level.toLowerCase();

  if (normalized === "newbie" || normalized === "beginner") return "newBie";
  if (normalized === "cancook" || normalized === "intermediate" || normalized === "medium") return "canCook";
  if (normalized === "expert" || normalized === "advanced") return "expert";

  // Check against exact enum values
  if (level === "newBie" || level === "canCook" || level === "expert") {
    return level as "newBie" | "canCook" | "expert";
  }

  return "canCook"; // Default fallback
}
