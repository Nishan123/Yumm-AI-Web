"use client";

import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShoppingListItem } from "@/lib/types/shopping-list.type";

interface ShoppingListTileProps {
  item: ShoppingListItem;
  displayName: string;
  displayImage: string;
  daysAgo: string;
  onToggleChecked: (item: ShoppingListItem) => void;
  onDelete: (itemId: string) => void;
}

export const ShoppingListTile = ({
  item,
  displayName,
  displayImage,
  daysAgo,
  onToggleChecked,
  onDelete,
}: ShoppingListTileProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-2xl border transition-all",
        item.isChecked
          ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/40"
          : "bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800",
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggleChecked(item)}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
          item.isChecked
            ? "bg-green-500 border-green-500"
            : "border-gray-300 dark:border-zinc-600 hover:border-green-400",
        )}
      >
        {item.isChecked && (
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Image */}
      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 shrink-0">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={displayName}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-zinc-600 text-xs">
            N/A
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "font-semibold text-sm",
            item.isChecked
              ? "line-through text-gray-400 dark:text-gray-600"
              : "text-gray-800 dark:text-gray-200",
          )}
        >
          {displayName}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {item.quantity} {item.unit} •{" "}
          {daysAgo === "0" ? "Today" : `${daysAgo}d ago`}
        </p>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(item.itemId)}
        className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-300 dark:text-zinc-600 hover:text-red-500 transition-colors shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
