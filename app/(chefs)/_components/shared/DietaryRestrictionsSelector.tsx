"use client";

import React, { useState } from "react";
import { ChevronDown, Check, Salad } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConstantsString } from "@/data/constants";

interface DietaryRestrictionsSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export const DietaryRestrictionsSelector = ({
  selected,
  onChange,
  className,
}: DietaryRestrictionsSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDietary = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 hover:border-orange-200 hover:ring-2 hover:ring-orange-50 transition-all shadow-sm active:scale-[0.99]"
      >
        <div className="flex items-center gap-2.5">
          <div className="bg-green-50 p-1.5 rounded-lg text-green-600">
            <Salad className="w-4 h-4" />
          </div>
          <span className="truncate">
            {selected.length === 0
              ? "No Dietary Restrictions"
              : `${selected.length} Restriction${
                  selected.length > 1 ? "s" : ""
                } Selected`}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          )}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 p-2 space-y-1 max-h-64 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            {ConstantsString.dietaryRestrictions.map((item) => (
              <div
                key={item}
                onClick={() => toggleDietary(item)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm font-medium",
                  selected.includes(item)
                    ? "bg-orange-50 text-orange-700"
                    : "text-gray-600 hover:bg-gray-50",
                )}
              >
                <span>{item}</span>
                {selected.includes(item) && (
                  <Check className="w-4 h-4 text-orange-500" />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
