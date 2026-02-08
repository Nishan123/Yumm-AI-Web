"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChefHat, ChevronDown, Check } from "lucide-react";
import { InputWidgetTitle } from "@/app/(chefs)/_components/shared/InputWidgetTitle";
import { IngredientsWrapContainer } from "@/app/(chefs)/_components/shared/IngredientsWrapContainer";
import { AddIngredientsModal } from "@/app/(chefs)/_components/shared/AddIngredientsModal";
import { AvailableTimeSelector } from "@/app/(chefs)/_components/shared/AvailableTimeSelector";
import { CustomTabBar } from "@/app/(chefs)/_components/shared/CustomTabBar";
import { IngredientModel } from "@/data/mockIngredients";
import { MEAL_OPTIONS, EXPERTISE_OPTIONS } from "@/data/options";
import { MealSelector } from "@/app/(chefs)/_components/shared/MealSelector";
import { ConstantsString } from "@/data/constants";
import { cn } from "@/lib/utils";
import { DietaryRestrictionsSelector } from "@/app/(chefs)/_components/shared/DietaryRestrictionsSelector";
import { RecipeGenerationModal } from "@/app/(chefs)/_components/shared/RecipeGenerationModal";
import { useRecipeGeneration } from "@/hooks/useRecipeGeneration";
import { toast } from "sonner";
import { useAuth } from "@/lib/context/auth-context";

export default function MacroChefPage() {
  const router = useRouter();
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientModel[]
  >([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedMeal, setSelectedMeal] = useState(MEAL_OPTIONS[5].value);
  const [time, setTime] = useState(30);
  const [expertise, setExpertise] = useState(EXPERTISE_OPTIONS[0].value);
  const [dietary, setDietary] = useState<string[]>([]);

  const [macros, setMacros] = useState({
    carbs: "",
    proteins: "",
    fats: "",
    fiber: "",
  });

  const { state, generateMacroRecipe, resetState, isLoading } =
    useRecipeGeneration();
  const { user, isLoading: loading } = useAuth();

  const handleMacroChange = (key: keyof typeof macros, value: string) => {
    // Prevent negative values
    if (value && parseFloat(value) < 0) return;
    setMacros((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerateRecipe = async () => {
    if (selectedIngredients.length === 0) {
      toast.error("Please select at least one ingredient!");
      return;
    }

    // Calculate calories from macros
    const carbs = parseFloat(macros.carbs) || 0;
    const proteins = parseFloat(macros.proteins) || 0;
    const fats = parseFloat(macros.fats) || 0;
    const fiber = parseFloat(macros.fiber) || 0;
    const calories = carbs * 4 + proteins * 4 + fats * 9;

    try {
      const recipe = await generateMacroRecipe({
        ingredients: selectedIngredients,
        carbs,
        proteins,
        fats,
        fiber,
        calories,
        mealType: selectedMeal,
        dietaryRestrictions: dietary,
        availableTimeMinutes: time,
        expertise: expertise,
        userId: user?.uid,
        allergenicIngredients: user?.allergenicIngredients,
      });

      if (recipe) {
        console.log("Recipe generated successfully:", recipe.recipeName);
        // Store the generated recipe in sessionStorage for the cooking page
        // Store the generated recipe in sessionStorage (optional now, but good for backup)
        const recipeStr = JSON.stringify(recipe);
        sessionStorage.setItem("generatedRecipe", recipeStr);
        console.log("Recipe stored, navigating to recipe ID...");
        // Redirect using recipeId to force loading from DB
        window.location.href = `/cooking?recipeId=${recipe.recipeId}`;
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
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Macro Chef</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto py-6 space-y-6">
        {/* Ingredients */}
        <div>
          <InputWidgetTitle
            title="Selected ingredients"
            haveActionButton
            actionButtonText="Add Item"
            onActionTap={() => setIsAddModalOpen(true)}
          />
          <IngredientsWrapContainer
            items={selectedIngredients}
            onRemoveItem={(id) =>
              setSelectedIngredients((prev) => prev.filter((i) => i.id !== id))
            }
            haveAddIngredientButton
            onAddIngredientButtonPressed={() => setIsAddModalOpen(true)}
          />
        </div>

        {/* Macro Nutrients */}
        <div className="px-4">
          <InputWidgetTitle
            title="Enter your target macro nutrients."
            className="px-0"
          />
          <div className="space-y-3 mt-2">
            <input
              type="number"
              min="0"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-100 transition-all text-sm"
              placeholder="Carbs (gr.)"
              value={macros.carbs}
              onChange={(e) => handleMacroChange("carbs", e.target.value)}
            />
            <input
              type="number"
              min="0"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-100 transition-all text-sm"
              placeholder="Proteins (gr.)"
              value={macros.proteins}
              onChange={(e) => handleMacroChange("proteins", e.target.value)}
            />
            <input
              type="number"
              min="0"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-100 transition-all text-sm"
              placeholder="Fats (gr.)"
              value={macros.fats}
              onChange={(e) => handleMacroChange("fats", e.target.value)}
            />
            <input
              type="number"
              min="0"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-100 transition-all text-sm"
              placeholder="Fiber (gr.)"
              value={macros.fiber}
              onChange={(e) => handleMacroChange("fiber", e.target.value)}
            />
          </div>
        </div>

        {/* Meal Type */}
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

        {/* Dietary Restrictions */}
        <div className="px-4">
          <InputWidgetTitle
            title="Have any dietary restrictions?"
            className="px-0"
          />
          <div className="mt-2">
            <DietaryRestrictionsSelector
              selected={dietary}
              onChange={setDietary}
            />
          </div>
        </div>

        {/* Time and Expertise */}
        <div className="px-4">
          <InputWidgetTitle
            title="How much time do you have?"
            className="px-0"
          />
          <AvailableTimeSelector
            selectedDuration={time}
            onDurationChange={setTime}
          />
        </div>

        <div className="px-4">
          <InputWidgetTitle
            title="Select your expertise in cooking."
            className="px-0"
          />
          <CustomTabBar
            tabs={EXPERTISE_OPTIONS.map((e) => e.label)}
            activeTab={
              EXPERTISE_OPTIONS.find((e) => e.value === expertise)?.label || ""
            }
            onTabChange={(label) => {
              const val = EXPERTISE_OPTIONS.find(
                (e) => e.label === label,
              )?.value;
              if (val) setExpertise(val);
            }}
          />
        </div>

        {/* Generate Button */}
        <div className="px-4 pt-4">
          <button
            className="w-full h-14 bg-black text-white rounded-full font-bold text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerateRecipe}
            disabled={isLoading}
          >
            <ChefHat className="w-6 h-6" />
            Generate Recipe
          </button>
        </div>
      </div>

      <AddIngredientsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        selectedIngredients={selectedIngredients}
        onConfirm={setSelectedIngredients}
      />

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
