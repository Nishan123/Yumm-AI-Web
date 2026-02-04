"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChefHat } from "lucide-react";
import { InputWidgetTitle } from "@/components/InputWidgetTitle";
import { IngredientsWrapContainer } from "@/components/IngredientsWrapContainer";
import { AddIngredientsModal } from "@/components/AddIngredientsModal";
import { AvailableTimeSelector } from "@/components/AvailableTimeSelector";
import { CustomTabBar } from "@/components/CustomTabBar";
import { IngredientModel } from "@/data/mockIngredients";
import { MEAL_OPTIONS, EXPERTISE_OPTIONS } from "@/data/options";
import { MealSelector } from "@/components/MealSelector";
import { cn } from "@/lib/utils";

export default function PantryChefPage() {
  const router = useRouter();
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientModel[]
  >([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedMeal, setSelectedMeal] = useState(MEAL_OPTIONS[5].value); // Default 'anything'
  const [duration, setDuration] = useState(30);
  const [expertise, setExpertise] = useState(EXPERTISE_OPTIONS[0].value);

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
          <h1 className="text-xl font-bold text-gray-900">Pantry Chef</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto py-6 space-y-6">
        {/* Ingredients Section */}
        <div>
          {/* Hint or Tab Bar could go here same as flutter, skipping generic 'CookbookHint' for now or adding simple text */}
          <div className="px-4 mb-4">
            <CustomTabBar
              tabs={["Ingredients List", "Your Inventory"]}
              activeTab="Ingredients List"
              onTabChange={() => {}}
            />
          </div>

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

        {/* Time Selector */}
        <div className="px-4">
          <InputWidgetTitle
            title="How much time do you have?"
            className="px-0"
          />
          <AvailableTimeSelector
            selectedDuration={duration}
            onDurationChange={setDuration}
          />
        </div>

        {/* Expertise Selector */}
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
            className="w-full h-14 bg-black text-white rounded-full font-bold text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            onClick={() => {
              if (selectedIngredients.length === 0) {
                alert("Please select at least one ingredient!");
                return;
              }
              alert(`Generating ${selectedMeal} recipe for ${duration} mins!`);
            }}
          >
            <ChefHat className="w-6 h-6" />
            Generate Meal
          </button>
        </div>
      </div>

      <AddIngredientsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        selectedIngredients={selectedIngredients}
        onConfirm={setSelectedIngredients}
      />
    </div>
  );
}
