"use client";

import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvailableTimeSelectorProps {
  selectedDuration: number; // in minutes
  onDurationChange: (duration: number) => void;
  className?: string;
}

export const AvailableTimeSelector = ({
  selectedDuration,
  onDurationChange,
  className,
}: AvailableTimeSelectorProps) => {
  // Min 15, Max 180
  const MIN = 15;
  const MAX = 180;
  const percentage = ((selectedDuration - MIN) / (MAX - MIN)) * 100;

  return (
    <div
      className={cn(
        "bg-white border border-gray-100 shadow-sm rounded-[24px] p-5 flex flex-col gap-4",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-gray-900">
          {selectedDuration < 60
            ? `${selectedDuration} min`
            : `${Math.floor(selectedDuration / 60)} hr ${
                selectedDuration % 60 > 0 ? `${selectedDuration % 60} min` : ""
              }`}
        </span>
      </div>

      <div className="relative w-full h-12 flex items-center">
        {/* Track */}
        <div className="absolute w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-150 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <input
          type="range"
          min={MIN}
          max={MAX}
          step="15"
          value={selectedDuration}
          onChange={(e) => onDurationChange(parseInt(e.target.value))}
          className="w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Custom Thumb */}
        <div
          className="absolute h-6 w-6 bg-white border-2 border-orange-500 rounded-full shadow-md pointer-events-none transition-all duration-150 ease-out flex items-center justify-center transform -translate-x-1/2"
          style={{ left: `${percentage}%` }}
        >
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
        </div>
      </div>

      <div className="flex justify-between w-full text-xs text-gray-400 font-medium px-1 -mt-2">
        <span>15min</span>
        <span>3hr</span>
      </div>
    </div>
  );
};
