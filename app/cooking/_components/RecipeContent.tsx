"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { RecipeInfoCard } from "./RecipeInfoCard";
import { RecipeMetadata } from "./RecipeMetadata";
import { CustomTabBar } from "@/app/(chefs)/_components/shared/CustomTabBar";
import { IngredientsList } from "./IngredientsList";
import { InstructionsList } from "./InstructionsList";
import { ToolsList } from "./ToolsList";
import { InitialPreparationList } from "./InitialPreparationList";
import { AnimatePresence, motion } from "framer-motion";
import { Recipe } from "@/lib/types/recipe.type";
import { UserRecipe } from "@/lib/types/cookbook.type";
import { toast } from "sonner";
import { BookMarked, Plus } from "lucide-react";

interface RecipeContentProps {
  recipe: Recipe | UserRecipe;
  isInCookbook?: boolean;
  onAddToCookbook?: () => void;
  isAddingToCookbook?: boolean;
  onUpdateProgress?: (updates: Partial<UserRecipe>) => void;
  currentUser?: { uid: string } | null;
}

export const RecipeContent = ({
  recipe,
  isInCookbook = false,
  onAddToCookbook,
  isAddingToCookbook = false,
  onUpdateProgress,
  currentUser,
}: RecipeContentProps) => {
  const TABS = ["Ingredients", "Instructions", "Tools"];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const checkPermission = () => {
    const isOwner = currentUser?.uid && currentUser.uid === recipe.generatedBy;

    if (!isInCookbook && !isOwner) {
      toast("Add to cookbook to track progress", {
        action: {
          label: "Add",
          onClick: () => onAddToCookbook?.(),
        },
      });
      return false;
    }
    return true;
  };

  const handleToggleIngredient = (index: number) => {
    if (!checkPermission() || !onUpdateProgress) return;

    const updatedIngredients = [...recipe.ingredients];
    const current = updatedIngredients[index];
    updatedIngredients[index] = { ...current, isReady: !current.isReady };
    onUpdateProgress({ ingredients: updatedIngredients });
  };

  const handleToggleTool = (index: number) => {
    if (!checkPermission() || !onUpdateProgress) return;

    const updatedTools = [...recipe.kitchenTools];
    const current = updatedTools[index];
    updatedTools[index] = { ...current, isReady: !current.isReady };
    onUpdateProgress({ kitchenTools: updatedTools });
  };

  const handleToggleInstruction = (index: number) => {
    if (!checkPermission() || !onUpdateProgress) return;

    const updatedSteps = [...recipe.steps];
    const current = updatedSteps[index];
    updatedSteps[index] = { ...current, isDone: !current.isDone };
    onUpdateProgress({ steps: updatedSteps });
  };

  const handleTogglePreparation = (index: number) => {
    if (!checkPermission() || !onUpdateProgress) return;

    if (recipe.initialPreparation) {
      const updatedPrep = [...recipe.initialPreparation];
      const current = updatedPrep[index];
      updatedPrep[index] = { ...current, isDone: !current.isDone };
      onUpdateProgress({ initialPreparation: updatedPrep });
    }
  };

  return (
    <div className="relative -mt-12 flex min-h-[60vh] flex-col rounded-t-[40px] bg-white p-8 border border-gray-100 dark:border-zinc-800 transition-all dark:bg-zinc-950 md:mt-0 md:min-h-0 md:rounded-none md:border-none md:p-0">
      {/* Drag Handle for Mobile (Visual only) */}
      <div className="mx-auto mb-8 h-1.5 w-12 rounded-full bg-gray-200 dark:bg-zinc-800 md:hidden" />

      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 space-y-4"
      >
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-black leading-tight tracking-tight text-gray-900 dark:text-gray-50 md:text-5xl">
            {recipe.recipeName}
          </h1>

          {/* Show Add to Cookbook ONLY if:
              1. Not already in cookbook
              2. Add handler is provided
              3. Current user is NOT the creator (optional logic if creator auto-owns, but here we just hide it to avoid confusion)
           */}
          {!isInCookbook &&
            onAddToCookbook &&
            currentUser?.uid !== recipe.generatedBy && (
              <button
                onClick={onAddToCookbook}
                disabled={isAddingToCookbook}
                className="flex-shrink-0 flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-orange-600 active:scale-95 disabled:opacity-50"
              >
                {isAddingToCookbook ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Plus size={16} />
                )}
                Add to Cookbook
              </button>
            )}

          {isInCookbook && (
            <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <BookMarked size={26} />
              In Cookbook
            </div>
          )}
        </div>

        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 md:text-lg">
          {recipe.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <RecipeInfoCard recipe={recipe} />
      </motion.div>

      {/* Recipe Metadata */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-10"
      >
        <RecipeMetadata recipe={recipe} />
      </motion.div>

      {/* Initial Preparation */}
      {recipe.initialPreparation && recipe.initialPreparation.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-10"
        >
          <InitialPreparationList
            preparations={recipe.initialPreparation}
            onToggle={handleTogglePreparation}
          />
        </motion.div>
      )}

      {/* Tabs */}
      <div className="mb-8">
        <CustomTabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "Ingredients" && (
              <IngredientsList
                ingredients={recipe.ingredients}
                onToggle={handleToggleIngredient}
              />
            )}
            {activeTab === "Instructions" && (
              <InstructionsList
                instructions={recipe.steps}
                onToggle={handleToggleInstruction}
              />
            )}
            {activeTab === "Tools" && (
              <ToolsList
                tools={recipe.kitchenTools}
                onToggle={handleToggleTool}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
