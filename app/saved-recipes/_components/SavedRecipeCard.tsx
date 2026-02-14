"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Flame, Brain, Trash2 } from "lucide-react";
import { Recipe } from "@/lib/types/recipe.type";
import { useRecipeLike } from "@/hooks/useRecipeLike";
import { ConfirmationModal } from "@/components/ConfirmationModal";

interface SavedRecipeCardProps {
  recipe: Recipe;
  onRemove?: (recipeId: string) => void;
}

export const SavedRecipeCard = ({ recipe, onRemove }: SavedRecipeCardProps) => {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const imageUrl =
    recipe.images && recipe.images.length > 0
      ? recipe.images[0]
      : "/placeholder-food.jpg";

  const { toggleLike } = useRecipeLike(recipe);

  const handleClick = () => {
    router.push(`/cooking?recipeId=${recipe.recipeId}`);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmDialog(true);
  };

  const handleConfirmRemove = async () => {
    await toggleLike();
    setShowConfirmDialog(false);
    if (onRemove) {
      onRemove(recipe.recipeId);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="group relative cursor-pointer bg-white dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800 rounded-[32px] overflow-hidden transition-all duration-300 hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-lg"
      >
        {/* Remove Button - Absolute to Card, High Z-Index, Positioned Top Right */}
        <button
          onClick={handleRemoveClick}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-black/60 backdrop-blur-sm 
                    flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 
                    transition-all duration-200 z-20 shadow-sm border border-gray-100 dark:border-transparent"
          title="Remove from saved"
        >
          <Trash2 size={20} />
        </button>

        {/* Large Image Section */}
        <div className="relative w-[calc(100%-24px)] aspect-[4/3] m-3 mb-0 rounded-[24px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={recipe.recipeName}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white line-clamp-1 mb-2">
            {recipe.recipeName}
          </h3>

          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
            {recipe.description}
          </p>

          {/* Tags Row */}
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Clock size={14} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                {recipe.estCookingTime}
              </span>
            </div>

            <div className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Brain size={14} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                {recipe.experienceLevel === "canCook"
                  ? "Can Cook"
                  : recipe.experienceLevel === "newBie"
                    ? "Newbie"
                    : "Expert"}
              </span>
            </div>

            <div className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Flame size={14} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                {recipe.calorie} kcal
              </span>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmRemove}
        title="Remove from Saved?"
        description={`Are you sure you want to remove "${recipe.recipeName}" from your saved recipes?`}
        confirmLabel="Remove"
        variant="destructive"
      />
    </>
  );
};
