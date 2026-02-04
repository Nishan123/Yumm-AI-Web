"use client";

import { ChevronLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RecipeHeaderProps {
  className?: string;
}

export const RecipeHeader = ({ className }: RecipeHeaderProps) => {
  const router = useRouter();

  return (
    <div className={cn("flex items-center justify-between p-6", className)}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.back()}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-white transition-all hover:bg-white/20"
        aria-label="Go back"
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, color: "#ef4444" }} // Red heart on hover
        whileTap={{ scale: 0.9 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-white transition-all hover:bg-white/20"
        aria-label="Favorite recipe"
      >
        <Heart className="h-6 w-6 transition-colors" />
      </motion.button>
    </div>
  );
};
