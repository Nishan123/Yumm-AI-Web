"use client";

import { Clock, ChefHat, Sandwich, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Recipe } from "@/lib/types/recipe.type";

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  subLabel: string;
  color: string;
  bgColor: string;
  delay?: number;
}

const InfoItem = ({
  icon: Icon,
  label,
  subLabel,
  color,
  bgColor,
  delay = 0,
}: InfoItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -2 }}
      className="group flex flex-col items-center gap-3 cursor-default"
    >
      <div className="relative">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105",
            bgColor,
          )}
        >
          <Icon
            className={cn(
              "h-8 w-8 transition-transform duration-300 group-hover:-rotate-12",
              color,
            )}
            strokeWidth={2}
          />
        </div>
        <div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-20 blur-xl",
            bgColor,
          )}
        />
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span className="text-base font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {label}
        </span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {subLabel}
        </span>
      </div>
    </motion.div>
  );
};

interface RecipeInfoCardProps {
  recipe: Recipe;
  className?: string;
}

const difficultyMap: Record<string, string> = {
  newBie: "Beginner",
  canCook: "Intermediate",
  expert: "Expert",
};

export const RecipeInfoCard = ({ recipe, className }: RecipeInfoCardProps) => {
  const difficulty =
    difficultyMap[recipe.experienceLevel] || recipe.experienceLevel;
  const stepsCount = recipe.steps?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative w-full overflow-hidden rounded-[32px] bg-white px-[20px] py-[22px]",
        "border border-gray-100 dark:border-gray-800",
        "dark:bg-zinc-900/80 dark:backdrop-blur-xl",
        className,
      )}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-gradient-to-br from-orange-50 to-orange-100/20 dark:from-orange-500/5 dark:to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 rounded-full bg-gradient-to-tr from-rose-50 to-rose-100/20 dark:from-rose-500/5 dark:to-transparent blur-3xl" />

      <div className="relative flex w-full items-center justify-between px-4 sm:px-8">
        <InfoItem
          icon={Clock}
          label={recipe.estCookingTime}
          subLabel="Prep Time"
          color="text-rose-500"
          bgColor="bg-rose-50 dark:bg-rose-500/10"
          delay={0.1}
        />

        {/* Vertical Divider */}
        <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent dark:via-gray-700 mx-2 sm:mx-0" />

        <InfoItem
          icon={Sandwich}
          label={stepsCount.toString()}
          subLabel="Steps"
          color="text-sky-500"
          bgColor="bg-sky-50 dark:bg-sky-500/10"
          delay={0.2}
        />

        {/* Vertical Divider */}
        <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent dark:via-gray-700 mx-2 sm:mx-0" />

        <InfoItem
          icon={ChefHat}
          label={difficulty}
          subLabel="Level"
          color="text-amber-500"
          bgColor="bg-amber-50 dark:bg-amber-500/10"
          delay={0.3}
        />
      </div>
    </motion.div>
  );
};
