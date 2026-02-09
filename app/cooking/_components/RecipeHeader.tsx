"use client";

import { ChevronLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Recipe } from "@/lib/types/recipe.type";
import { useRecipeLike } from "@/hooks/useRecipeLike";

interface RecipeHeaderProps {
  className?: string;
  recipe?: Recipe;
}

export const RecipeHeader = ({ className, recipe }: RecipeHeaderProps) => {
  const router = useRouter();

  const { isLiked, toggleLike } = useRecipeLike(recipe!); // Non-null assertion safe due to parent logic

  return (
    <div className={cn("flex items-center justify-between p-6", className)}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/home")}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-white transition-all hover:bg-white/20"
        aria-label="Go back"
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleLike}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-lg border border-white/20 shadow-lg transition-all",
          isLiked
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-white/10 text-white hover:bg-white/20",
        )}
        aria-label="Favorite recipe"
      >
        <Heart
          className={cn("h-6 w-6 transition-colors", isLiked && "fill-current")}
        />
      </motion.button>
    </div>
  );
};
