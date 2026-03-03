"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ScanLine } from "lucide-react";
import { InputWidgetTitle } from "@/app/(chefs)/_components/shared/InputWidgetTitle";
import { VisibilitySelector } from "@/app/(chefs)/_components/shared/VisibilitySelector";
import { ImageUploadArea } from "@/app/(chefs)/_components/shared/ImageUploadArea";
import { MealSelector } from "@/app/(chefs)/_components/shared/MealSelector";
import { RecipeGenerationModal } from "@/app/(chefs)/_components/shared/RecipeGenerationModal";
import { MEAL_OPTIONS } from "@/data/options";
import { useRecipeGeneration } from "@/hooks/useRecipeGeneration";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";

export default function FridgeScannerPage() {
  const router = useRouter();
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState(MEAL_OPTIONS[5].value);
  const [isPublic, setIsPublic] = useState(true);

  const { state, generateFridgeScannerRecipe, resetState, isLoading } =
    useRecipeGeneration();
  const { user } = useAuth();

  const handleGenerateRecipe = async () => {
    if (!imageBase64) {
      toast.error("Please upload a photo of your fridge!");
      return;
    }

    try {
      const recipe = await generateFridgeScannerRecipe({
        imageBase64,
        mealType: selectedMeal,
        userId: user?.uid,
        isPublic,
      });

      if (recipe) {
        if (isPublic) {
          window.location.href = `/cooking?recipeId=${recipe.recipeId}`;
        } else {
          sessionStorage.setItem("generatedRecipe", JSON.stringify(recipe));
          window.location.href = `/cooking?recipeId=${recipe.recipeId}&generated=true`;
        }
      } else {
        toast.error("No recipe was generated. Please try again.");
      }
    } catch (error) {
      console.error("Failed to generate recipe:", error);
      toast.error("Failed to generate recipe. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Fridge Scanner</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto py-6 space-y-6">
        {/* Image Upload Section */}
        <div className="px-4">
          <InputWidgetTitle
            title="Take a photo of your fridge"
            className="px-0"
          />
          <div className="mt-2">
            <ImageUploadArea
              onImageSelected={setImageBase64}
              imagePreview={imageBase64}
              onRemoveImage={() => setImageBase64(null)}
              label="Upload a photo of your fridge"
            />
          </div>
        </div>

        {/* Meal Type Section */}
        <div className="px-4">
          <InputWidgetTitle
            title="What meal do you want to cook?"
            className="px-0"
          />
          <MealSelector
            selectedMeal={selectedMeal}
            onSelect={setSelectedMeal}
          />
        </div>

        {/* Recipe Visibility */}
        <div className="px-4">
          <InputWidgetTitle title="Recipe Visibility" className="px-0" />
          <div className="mt-2">
            <VisibilitySelector isPublic={isPublic} onChange={setIsPublic} />
          </div>
        </div>

        {/* Generate Button */}
        <div className="px-4 pt-4">
          <button
            className="w-full h-14 bg-black text-white rounded-full font-bold text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerateRecipe}
            disabled={isLoading}
          >
            <ScanLine className="w-6 h-6" />
            Generate Recipe
          </button>
        </div>
      </div>

      <RecipeGenerationModal
        isOpen={isLoading || state.status === "error"}
        status={state.status}
        loadingMessage={state.loadingMessage}
        errorMessage={state.errorMessage}
        onClose={resetState}
      />
    </div>
  );
}
