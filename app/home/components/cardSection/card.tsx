"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Clock, Flame, ChefHat, Users } from "lucide-react";
import { Recipe } from "@/lib/types/recipe.type";
import { useRecipeLike } from "@/hooks/useRecipeLike";

export interface CardProps {
  recipe: Recipe;
}

const difficultyMap: Record<string, string> = {
  newBie: "Newbie",
  canCook: "CanCook",
  expert: "Expert",
};

const Card = ({ recipe }: CardProps) => {
  const router = useRouter();
  const imageUrl =
    recipe.images && recipe.images.length > 0
      ? recipe.images[0]
      : "/placeholder-food.jpg";

  const difficulty =
    difficultyMap[recipe.experienceLevel] || recipe.experienceLevel;

  const { isLiked, toggleLike } = useRecipeLike(recipe);

  const handleClick = () => {
    router.push(`/cooking?recipeId=${recipe.recipeId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-81.25 group cursor-pointer border border-gray-100 rounded-4xl p-2 transition-all duration-300 hover:border-gray-300"
    >
      <div className="relative rounded-3xl w-full h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={recipe.recipeName}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div
          onClick={toggleLike}
          className={`absolute w-10 h-10 rounded-full right-2 top-2 
          flex justify-center items-center backdrop-blur-sm transition-all cursor-pointer
          ${isLiked ? "bg-red-500 text-white hover:bg-red-600" : "bg-white/40 text-white group-hover:bg-white/60"}`}
        >
          <Heart className={isLiked ? "fill-current" : ""} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-2">
        <div className="font-bold text-[20px] line-clamp-1">
          {recipe.recipeName}
        </div>
        <div className="flex text-[14px]">
          <div className="text-[#676767] line-clamp-2">
            {recipe.description}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-1">
          <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-[11px] font-medium whitespace-nowrap">
            <Flame size={11} />
            <span>{recipe.calorie} cal</span>
          </div>
          <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-[11px] font-medium whitespace-nowrap">
            <Clock size={11} />
            <span>{recipe.estCookingTime}</span>
          </div>
          <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-full text-[11px] font-medium whitespace-nowrap">
            <ChefHat size={11} />
            <span>{difficulty}</span>
          </div>
          <div className="flex items-center gap-1 bg-purple-50 text-purple-600 px-2 py-1 rounded-full text-[11px] font-medium whitespace-nowrap">
            <Users size={11} />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
