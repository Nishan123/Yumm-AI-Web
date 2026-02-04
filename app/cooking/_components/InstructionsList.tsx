"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check } from "lucide-react";
import { Instruction } from "@/lib/types/recipe.type";

interface InstructionsListProps {
  instructions: Instruction[];
  onToggle?: (index: number) => void;
}

export const InstructionsList = ({
  instructions,
  onToggle,
}: InstructionsListProps) => {
  if (!instructions || instructions.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No instructions available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-2">
      {instructions.map((instruction, index) => {
        const isCompleted = !!instruction.isDone;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "group relative flex gap-6 cursor-pointer",
              isCompleted && "opacity-60",
            )}
            onClick={() => onToggle?.(index)}
          >
            {/* Timeline Line */}
            {index !== instructions.length - 1 && (
              <div className="absolute left-[20px] top-14 h-[calc(100%+24px)] w-[2px] bg-gray-100 dark:bg-zinc-800/50 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/20 transition-colors" />
            )}

            {/* Step Bubble / Checkbox */}
            <div className="flex flex-none flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ring-4 ring-white transition-all duration-300",
                  isCompleted
                    ? "bg-green-500 text-white ring-green-100 dark:ring-green-900/30"
                    : "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white dark:bg-orange-500/10 dark:text-orange-400 dark:ring-zinc-950 dark:group-hover:bg-orange-500 dark:group-hover:text-white",
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
              </div>
            </div>

            {/* Content Card */}
            <div
              className={cn(
                "flex-1 rounded-2xl border p-5 transition-all",
                isCompleted
                  ? "border-green-200 bg-green-50/30 dark:border-green-900/30 dark:bg-green-900/5"
                  : "border-gray-100 bg-white hover:border-orange-100 hover:bg-orange-50/30 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50",
              )}
            >
              <p
                className={cn(
                  "text-base leading-relaxed text-gray-600 dark:text-gray-300 transition-all",
                  isCompleted &&
                    "line-through text-gray-400 dark:text-gray-600",
                )}
              >
                {instruction.instruction}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
