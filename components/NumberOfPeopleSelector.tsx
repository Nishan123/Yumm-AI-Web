"use client";

import React from "react";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface NumberOfPeopleSelectorProps {
  count: number;
  onChange: (count: number) => void;
  className?: string;
}

export const NumberOfPeopleSelector = ({
  count,
  onChange,
  className,
}: NumberOfPeopleSelectorProps) => {
  return (
    <div
      className={cn(
        "bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-4",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            {count}{" "}
            <span className="text-sm font-medium text-gray-400">People</span>
          </span>
        </div>
      </div>

      <div className="relative w-full h-12 flex items-center">
        {/* Track */}
        <div className="absolute w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-150 ease-out"
            style={{ width: `${((count - 1) / 9) * 100}%` }}
          />
        </div>

        {/* Pseudo Ticks (Optional visual guide) */}
        <div className="absolute w-full flex justify-between px-1 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 h-1 rounded-full",
                i + 1 <= count ? "bg-white/50" : "bg-gray-300",
              )}
            />
          ))}
        </div>

        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={count}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Thumb (Custom visual if we wanted, but native range input with a colored track is often cleaner and easier to maintain. 
            For now, I'm relying on the native thumb or I can style it.
            React ranges can be tricky to style perfectly across browsers without custom CSS. 
            Let's stick to a clean functional native input but with visual track over it.
        */}
        <div
          className="absolute h-6 w-6 bg-white border-2 border-blue-500 rounded-full shadow-md pointer-events-none transition-all duration-150 ease-out flex items-center justify-center transform -translate-x-1/2"
          style={{ left: `${((count - 1) / 9) * 100}%` }}
        >
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
        </div>
      </div>

      <div className="flex justify-between w-full text-xs text-gray-400 font-medium px-1 -mt-2">
        <span>1</span>
        <span>10</span>
      </div>
    </div>
  );
};
