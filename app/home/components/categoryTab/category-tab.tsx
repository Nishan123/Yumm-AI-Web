"use client";
import React from "react";
import { MEAL_TYPES } from "@/lib/types/recipe.type";

interface CategoryTabProps {
  selectedMealType: string | undefined;
  onMealTypeChange: (mealType: string | undefined) => void;
}

const categories = [
  { label: "Anything", value: undefined as string | undefined },
  ...MEAL_TYPES.map((m) => ({
    label: m.label,
    value: m.value as string | undefined,
  })),
];

const CategoryTab = ({
  selectedMealType,
  onMealTypeChange,
}: CategoryTabProps) => {
  return (
    <div className="mt-10 md:mt-15 flex w-full max-w-[1360px] px-4 lg:px-0 items-center">
      <ul className="flex flex-wrap gap-3 md:gap-4 lg:gap-6.5 font-pop font-normal items-center">
        {categories.map((category) => (
          <li
            key={category.label}
            className={`cursor-pointer transition-colors whitespace-nowrap ${
              selectedMealType === category.value
                ? "font-bold text-[#6F8A15]"
                : "text-black dark:text-gray-300 hover:text-[#6F8A15]/70"
            }`}
            onClick={() => onMealTypeChange(category.value)}
          >
            {category.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryTab;
