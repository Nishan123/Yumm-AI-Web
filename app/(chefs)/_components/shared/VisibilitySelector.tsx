"use client";

import React from "react";
import { Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisibilitySelectorProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
}

export function VisibilitySelector({
  isPublic,
  onChange,
}: VisibilitySelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex gap-3 px-4">
        {/* Public Button */}
        <button
          type="button"
          onClick={() => onChange(true)}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border font-semibold text-sm transition-all",
            isPublic
              ? "bg-orange-500 border-orange-500 text-white shadow-md"
              : "bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100",
          )}
        >
          <Globe className="w-4 h-4" />
          Public
        </button>

        {/* Private Button */}
        <button
          type="button"
          onClick={() => onChange(false)}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border font-semibold text-sm transition-all",
            !isPublic
              ? "bg-orange-500 border-orange-500 text-white shadow-md"
              : "bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100",
          )}
        >
          <Lock className="w-4 h-4" />
          Private
        </button>
      </div>

      <p className="text-xs text-gray-500 px-4">
        {isPublic
          ? "Your recipe will be visible to all users and appear in home recommendations."
          : "Your recipe will be saved privately in your cookbook only."}
      </p>
    </div>
  );
}
