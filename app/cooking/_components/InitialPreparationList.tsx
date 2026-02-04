"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check } from "lucide-react";
import { InitialPreparation } from "@/lib/types/recipe.type";

interface InitialPreparationListProps {
  preparations: InitialPreparation[];
  onToggle?: (index: number) => void;
}

export const InitialPreparationList = ({
  preparations,
  onToggle,
}: InitialPreparationListProps) => {
  if (!preparations || preparations.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3 mb-2">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Initial Preparation
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Get ready before you start cooking
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {preparations.map((prep, index) => {
          const isCompleted = !!prep.isDone;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative flex items-start gap-4 rounded-2xl border p-4 transition-all duration-300 cursor-pointer overflow-hidden",
                isCompleted
                  ? "bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900/30"
                  : "bg-white border-gray-100 hover:border-orange-200 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-orange-500/30",
              )}
              onClick={() => onToggle?.(index)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Checkbox */}
              <div className="relative flex-none pt-0.5">
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 bg-transparent text-transparent group-hover:border-orange-400 dark:border-zinc-600 dark:group-hover:border-orange-400",
                  )}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <p
                  className={cn(
                    "text-base leading-relaxed transition-all duration-300",
                    isCompleted
                      ? "text-gray-500 line-through dark:text-gray-500"
                      : "text-gray-700 dark:text-gray-200",
                  )}
                >
                  {prep.instruction}
                </p>
              </div>

              {/* Decorative gradient blur for active state */}
              {!isCompleted && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500/5" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
