"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { KitchenTool } from "@/lib/types/recipe.type";
import Image from "next/image";

interface ToolsListProps {
  tools: KitchenTool[];
  onToggle?: (index: number) => void;
}

// Emoji mapping for common kitchen tools as fallback
const TOOL_EMOJI_MAP: Record<string, string> = {
  oven: "🔥",
  "baking tray": "🥣",
  "mixing bowl": "🥘",
  knife: "🔪",
  "chef knife": "🔪",
  "cutting board": "🪵",
  tongs: "🥢",
  pan: "🍳",
  pot: "🍲",
  spatula: "🥄",
  whisk: "🥄",
  blender: "🌀",
  "food processor": "⚙️",
  grater: "📋",
  peeler: "🔧",
  strainer: "🥅",
  colander: "🥅",
  spoon: "🥄",
  fork: "🍴",
  ladle: "🥄",
  default: "🍴",
};

const getToolEmoji = (toolName: string): string => {
  const lowerName = toolName.toLowerCase();
  for (const [key, emoji] of Object.entries(TOOL_EMOJI_MAP)) {
    if (lowerName.includes(key)) {
      return emoji;
    }
  }
  return TOOL_EMOJI_MAP.default;
};

export const ToolsList = ({ tools, onToggle }: ToolsListProps) => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (toolId: string) => {
    setImageErrors((prev) => new Set(prev).add(toolId));
  };

  if (!tools || tools.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">No tools required</div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3">
      {tools.map((tool, index) => {
        const isChecked = !!tool.isReady;
        const hasImageError = imageErrors.has(tool.toolId);
        const showImage = tool.imageUrl && !hasImageError;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onToggle?.(index)}
            className={cn(
              "relative flex cursor-pointer flex-col items-center gap-3 rounded-2xl border p-6 transition-all hover:-translate-y-1",
              isChecked
                ? "border-green-500 bg-green-50 dark:bg-green-500/10 dark:border-green-500"
                : "border-gray-100 bg-white dark:border-zinc-800 dark:bg-zinc-900",
            )}
          >
            {isChecked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-sm"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </motion.div>
            )}

            <div
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-full transition-colors duration-300",
                showImage ? "bg-gray-50 dark:bg-zinc-800 overflow-hidden" : "",
              )}
            >
              {showImage ? (
                <Image
                  src={tool.imageUrl}
                  alt={tool.toolName}
                  width={80}
                  height={80}
                  className="object-contain p-2"
                  onError={() => handleImageError(tool.toolId)}
                  unoptimized
                />
              ) : (
                <span className="text-3xl">{getToolEmoji(tool.toolName)}</span>
              )}
            </div>

            <span
              className={cn(
                "font-semibold transition-colors duration-300 text-center",
                isChecked
                  ? "text-green-700 dark:text-green-400"
                  : "text-gray-700 dark:text-gray-200",
              )}
            >
              {tool.toolName}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};
