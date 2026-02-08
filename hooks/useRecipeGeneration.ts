"use client";

import { useState, useCallback } from "react";
import { Recipe } from "@/lib/types/recipe.type";
import { IngredientModel, MOCK_INGREDIENTS } from "@/data/mockIngredients";
import { generateRecipeWithGemini } from "@/lib/services/gemini";
import { generateRecipeImages } from "@/lib/services/imagen";
import { getAllKitchenTools } from "@/lib/services/kitchenTools";
import {
  saveRecipeAction,
  uploadRecipeImagesAction
} from "@/lib/actions/recipe-action";
import {
  getPantryChefPrompt,
  getMasterChefPrompt,
  getMacroChefPrompt,
  PantryChefParams,
  MasterChefParams,
  MacroChefParams,
} from "@/lib/services/prompts";

export type RecipeGenerationStatus =
  | "idle"
  | "generatingRecipe"
  | "generatingImages"
  | "savingRecipe"
  | "success"
  | "error";

export interface RecipeGenerationState {
  status: RecipeGenerationStatus;
  loadingMessage: string | null;
  errorMessage: string | null;
  generatedRecipe: Recipe | null;
}

const initialState: RecipeGenerationState = {
  status: "idle",
  loadingMessage: null,
  errorMessage: null,
  generatedRecipe: null,
};

function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export function useRecipeGeneration() {
  const [state, setState] = useState<RecipeGenerationState>(initialState);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  const generatePantryRecipe = useCallback(
    async (params: {
      ingredients: IngredientModel[];
      mealType: string;
      availableTimeMinutes: number;
      expertise: string;
      userId?: string;
      allergenicIngredients?: string[];
    }) => {
      try {
        setState({
          status: "generatingRecipe",
          loadingMessage: "Creating your perfect recipe...",
          errorMessage: null,
          generatedRecipe: null,
        });

        const kitchenTools = getAllKitchenTools();
        const prompt = getPantryChefPrompt({
          ingredients: params.ingredients,
          kitchenTools,
          mealType: params.mealType,
          availableTimeMinutes: params.availableTimeMinutes,
          expertise: params.expertise,
          allergenicIngredients: params.allergenicIngredients || [],
        });

        const recipe = await generateRecipeWithGemini({
          prompt,
          selectedIngredients: params.ingredients,
          masterIngredients: MOCK_INGREDIENTS,
          experienceLevel: params.expertise,
        });

        // Generate images for the recipe
        setState({
          status: "generatingImages",
          loadingMessage: "Generating beautiful food images...",
          errorMessage: null,
          generatedRecipe: null,
        });

        const images = await generateRecipeImages({
          recipeName: recipe.recipeName,
          description: recipe.description,
          numberOfImages: 1,
        });

        // Add images to recipe text initially (as base64 or empty, logic below handles upload)
        // We will upload them first
        let imageUrls: string[] = [];

        if (images.length > 0) {
          setState({
            status: "savingRecipe",
            loadingMessage: "Saving your recipe...",
            errorMessage: null,
            generatedRecipe: null,
          });

          try {
            const formData = new FormData();
            images.forEach((imgBase64, index) => {
              const blob = dataURItoBlob(imgBase64);
              formData.append("images", blob, `recipe_image_${index}.png`);
            });

            // Upload images using the recipe ID
            imageUrls = await uploadRecipeImagesAction(recipe.recipeId, formData);
          } catch (err) {
            console.error("Failed to upload images", err);
            // Continue without images if upload fails
          }
        }

        const recipeWithImages: Recipe = {
          ...recipe,
          images: imageUrls,
          generatedBy: params.userId || "guest", // Use passed userId or fallback
        };

        // Save the recipe to the server
        setState({
          status: "savingRecipe",
          loadingMessage: "Finalizing receipt...",
          errorMessage: null,
          generatedRecipe: null,
        });

        const savedRecipe = await saveRecipeAction(recipeWithImages);

        setState({
          status: "success",
          loadingMessage: null,
          errorMessage: null,
          generatedRecipe: savedRecipe,
        });

        return savedRecipe;

        return recipeWithImages;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to generate recipe";
        setState({
          status: "error",
          loadingMessage: null,
          errorMessage,
          generatedRecipe: null,
        });
        throw error;
      }
    },
    []
  );

  const generateMasterRecipe = useCallback(
    async (params: {
      ingredients: IngredientModel[];
      mealType: string;
      dietaryRestrictions: string[];
      numberOfServings: number;
      mealPreferences: string;
      availableTimeMinutes: number;
      expertise: string;
      userId?: string;
      allergenicIngredients?: string[];
    }) => {
      try {
        setState({
          status: "generatingRecipe",
          loadingMessage: "Crafting your master chef recipe...",
          errorMessage: null,
          generatedRecipe: null,
        });

        const kitchenTools = getAllKitchenTools();
        const prompt = getMasterChefPrompt({
          ingredients: params.ingredients,
          kitchenTools,
          mealType: params.mealType,
          dietaryRestrictions: params.dietaryRestrictions,
          numberOfServings: params.numberOfServings,
          mealPreferences: params.mealPreferences,
          availableTimeMinutes: params.availableTimeMinutes,
          expertise: params.expertise,
          allergenicIngredients: params.allergenicIngredients || [],
        });

        const recipe = await generateRecipeWithGemini({
          prompt,
          selectedIngredients: params.ingredients,
          masterIngredients: MOCK_INGREDIENTS,
          experienceLevel: params.expertise,
        });

        // Generate images for the recipe
        setState({
          status: "generatingImages",
          loadingMessage: "Generating beautiful food images...",
          errorMessage: null,
          generatedRecipe: null,
        });

        const images = await generateRecipeImages({
          recipeName: recipe.recipeName,
          description: recipe.description,
          numberOfImages: 1,
        });

        // Upload and Save Logic
        let imageUrls: string[] = [];

        if (images.length > 0) {
          setState({
            status: "savingRecipe",
            loadingMessage: "Saving your recipe...",
            errorMessage: null,
            generatedRecipe: null,
          });

          try {
            const formData = new FormData();
            images.forEach((imgBase64, index) => {
              const blob = dataURItoBlob(imgBase64);
              formData.append("images", blob, `recipe_image_${index}.png`);
            });
            imageUrls = await uploadRecipeImagesAction(recipe.recipeId, formData);
          } catch (err) {
            console.error("Failed to upload images", err);
          }
        }

        const recipeWithImages: Recipe = {
          ...recipe,
          images: imageUrls,
          generatedBy: params.userId || "guest",
        };

        setState({
          status: "savingRecipe",
          loadingMessage: "Finalizing receipt...",
          errorMessage: null,
          generatedRecipe: null,
        });

        const savedRecipe = await saveRecipeAction(recipeWithImages);

        setState({
          status: "success",
          loadingMessage: null,
          errorMessage: null,
          generatedRecipe: savedRecipe,
        });

        return savedRecipe;

        return recipeWithImages;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to generate recipe";
        setState({
          status: "error",
          loadingMessage: null,
          errorMessage,
          generatedRecipe: null,
        });
        throw error;
      }
    },
    []
  );

  const generateMacroRecipe = useCallback(
    async (params: {
      ingredients: IngredientModel[];
      carbs: number;
      proteins: number;
      fats: number;
      fiber: number;
      calories: number;
      mealType: string;
      dietaryRestrictions: string[];
      availableTimeMinutes: number;
      expertise: string;
      userId?: string;
      allergenicIngredients?: string[];
    }) => {
      try {
        setState({
          status: "generatingRecipe",
          loadingMessage: "Calculating your macro-perfect recipe...",
          errorMessage: null,
          generatedRecipe: null,
        });

        const kitchenTools = getAllKitchenTools();
        const prompt = getMacroChefPrompt({
          ingredients: params.ingredients,
          kitchenTools,
          carbs: params.carbs,
          proteins: params.proteins,
          fats: params.fats,
          fiber: params.fiber,
          calories: params.calories,
          mealType: params.mealType,
          dietaryRestrictions: params.dietaryRestrictions,
          availableTimeMinutes: params.availableTimeMinutes,
          expertise: params.expertise,
          allergenicIngredients: params.allergenicIngredients || [],
        });

        const recipe = await generateRecipeWithGemini({
          prompt,
          selectedIngredients: params.ingredients,
          masterIngredients: MOCK_INGREDIENTS,
          experienceLevel: params.expertise,
        });

        // Generate images for the recipe
        setState({
          status: "generatingImages",
          loadingMessage: "Generating beautiful food images...",
          errorMessage: null,
          generatedRecipe: null,
        });

        const images = await generateRecipeImages({
          recipeName: recipe.recipeName,
          description: recipe.description,
          numberOfImages: 1,
        });

        // Upload and Save Logic
        let imageUrls: string[] = [];

        if (images.length > 0) {
          setState({
            status: "savingRecipe",
            loadingMessage: "Saving your recipe...",
            errorMessage: null,
            generatedRecipe: null,
          });

          try {
            const formData = new FormData();
            images.forEach((imgBase64, index) => {
              const blob = dataURItoBlob(imgBase64);
              formData.append("images", blob, `recipe_image_${index}.png`);
            });
            imageUrls = await uploadRecipeImagesAction(recipe.recipeId, formData);
          } catch (err) {
            console.error("Failed to upload images", err);
          }
        }

        const recipeWithImages: Recipe = {
          ...recipe,
          images: imageUrls,
          generatedBy: params.userId || "guest",
        };

        setState({
          status: "savingRecipe",
          loadingMessage: "Finalizing receipt...",
          errorMessage: null,
          generatedRecipe: null,
        });

        const savedRecipe = await saveRecipeAction(recipeWithImages);

        setState({
          status: "success",
          loadingMessage: null,
          errorMessage: null,
          generatedRecipe: savedRecipe,
        });

        return savedRecipe;

        return recipeWithImages;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to generate recipe";
        setState({
          status: "error",
          loadingMessage: null,
          errorMessage,
          generatedRecipe: null,
        });
        throw error;
      }
    },
    []
  );

  return {
    state,
    resetState,
    generatePantryRecipe,
    generateMasterRecipe,
    generateMacroRecipe,
    isLoading: state.status === "generatingRecipe" || state.status === "generatingImages" || state.status === "savingRecipe",
  };
}
