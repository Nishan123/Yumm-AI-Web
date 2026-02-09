"use client";

import { motion } from "framer-motion";
import { Clock, Users, Flame, ChefHat } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserRecipe } from "@/lib/types/cookbook.type";
import Image from "next/image";

interface CookbookRecipeCardProps {
  recipe: UserRecipe;
  index: number;
}

export const CookbookRecipeCard = ({
  recipe,
  index,
}: CookbookRecipeCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/cooking?recipeId=${recipe.originalRecipeId}`);
  };

  // Calculate progress percentage
  const totalSteps = recipe.steps?.length || 0;
  const completedSteps =
    recipe.steps?.filter((step) => step.isDone).length || 0;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={handleClick}
      className="group cursor-pointer border border-gray-100 rounded-4xl p-2 transition-all duration-300 hover:border-gray-300"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 overflow-hidden rounded-3xl">
        {recipe.images && recipe.images.length > 0 && recipe.images[0] ? (
          <Image
            src={recipe.images[0]}
            alt={recipe.recipeName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ChefHat className="w-20 h-20 text-orange-400 opacity-50" />
          </div>
        )}

        {/* Progress bar overlay (only show if started) */}
        {progress > 0 && progress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20">
            <div
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 pt-2">
        <h3 className="font-bold text-[20px] line-clamp-1">
          {recipe.recipeName}
        </h3>

        <p className="text-[14px] text-[#676767] line-clamp-2">
          {recipe.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {recipe.estCookingTime && (
            <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-[11px] font-medium whitespace-nowrap">
              <Clock size={11} />
              <span>{recipe.estCookingTime}</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1 bg-purple-50 text-purple-600 px-2 py-1 rounded-full text-[11px] font-medium whitespace-nowrap">
              <Users size={11} />
              <span>{recipe.servings} servings</span>
            </div>
          )}
          {recipe.calorie && (
            <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-[11px] font-medium whitespace-nowrap">
              <Flame size={11} />
              <span>{recipe.calorie} cal</span>
            </div>
          )}
        </div>

        {/* Progress text */}
        {progress > 0 && (
          <div className="mt-1 pt-2 border-t border-gray-100">
            <p className="text-[11px] text-orange-600 font-medium">
              {progress === 100
                ? "Completed! 🎉"
                : `${completedSteps}/${totalSteps} steps completed`}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
