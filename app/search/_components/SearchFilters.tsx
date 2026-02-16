"use client";

import React, { useState } from "react";
import {
  SearchFilters as SearchFiltersType,
  EXPERIENCE_LEVELS,
  MEAL_TYPES,
} from "@/lib/types/recipe.type";
import { SlidersHorizontal, X } from "lucide-react";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onApply: (filters: SearchFiltersType) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const SearchFiltersPanel = ({
  filters,
  onApply,
  onClear,
  isOpen,
  onToggle,
}: SearchFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<SearchFiltersType>(filters);
  const [calorieRange, setCalorieRange] = useState<[number, number]>([
    filters.minCalorie ?? 0,
    filters.maxCalorie ?? 2000,
  ]);

  React.useEffect(() => {
    setLocalFilters(filters);
    setCalorieRange([filters.minCalorie ?? 0, filters.maxCalorie ?? 2000]);
  }, [filters]);

  const hasAnyFilter =
    localFilters.experienceLevel ||
    localFilters.mealType ||
    calorieRange[0] > 0 ||
    calorieRange[1] < 2000;

  const handleApply = () => {
    const appliedFilters: SearchFiltersType = {
      ...localFilters,
      minCalorie: calorieRange[0],
      maxCalorie: calorieRange[1],
    };
    onApply(appliedFilters);
    onToggle(); // Close modal on apply
  };

  const handleReset = () => {
    setLocalFilters({});
    setCalorieRange([0, 2000]);
    onClear();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
        onClick={onToggle}
      />

      {/* Modal Content */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl p-6 z-50 shadow-xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-[#6F8B15]" />
            <h3 className="font-bold text-gray-900 text-xl">Filters</h3>
          </div>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
            aria-label="Close filters"
          >
            <X size={24} className="text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        {/* Experience Level */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">
            Experience Level
          </p>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCE_LEVELS.map((level) => {
              const isSelected = localFilters.experienceLevel === level.value;
              return (
                <button
                  key={level.value}
                  onClick={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      experienceLevel: isSelected ? undefined : level.value,
                    }))
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
                    ${
                      isSelected
                        ? "bg-[#6F8B15] text-white border-[#6F8B15] shadow-md transform scale-105"
                        : "bg-gray-50 text-gray-700 border-transparent hover:bg-gray-100"
                    }`}
                >
                  {level.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Meal Type */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">Meal Type</p>
          <div className="flex flex-wrap gap-2">
            {MEAL_TYPES.map((meal) => {
              const isSelected = localFilters.mealType === meal.value;
              return (
                <button
                  key={meal.value}
                  onClick={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      mealType: isSelected ? undefined : meal.value,
                    }))
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
                    ${
                      isSelected
                        ? "bg-[#6F8B15] text-white border-[#6F8B15] shadow-md transform scale-105"
                        : "bg-gray-50 text-gray-700 border-transparent hover:bg-gray-100"
                    }`}
                >
                  {meal.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Calorie Range */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-900">Calories</p>
            <span className="text-sm font-medium text-[#6F8B15] bg-[#6F8B15]/10 px-3 py-1 rounded-full">
              {calorieRange[0]} – {calorieRange[1]} kcal
            </span>
          </div>
          <div className="space-y-4 px-1">
            <input
              type="range"
              min={0}
              max={2000}
              step={100}
              value={calorieRange[1]}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCalorieRange((prev) => [prev[0], Math.max(val, prev[0])]);
              }}
              className="w-full accent-[#6F8B15] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 font-medium">
              <span>0 kcal</span>
              <span>2000+ kcal</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold
              hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-[2] px-4 py-3 bg-[#6F8B15] text-white rounded-xl text-sm font-semibold
              hover:bg-[#5d7512] transition-colors shadow-lg shadow-[#6F8B15]/20"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchFiltersPanel;
