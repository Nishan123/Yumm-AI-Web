"use client";

import React from "react";
import { Check } from "lucide-react";

interface DealsCardProps {
  haveBestValueTag: boolean;
  actualPrice: number;
  oldPrice?: number;
  duration: string;
  haveOldPrice?: boolean;
  onUpgrade: () => void;
}

const DealsCard: React.FC<DealsCardProps> = ({
  haveBestValueTag,
  actualPrice,
  oldPrice,
  duration,
  haveOldPrice = true,
  onUpgrade,
}) => {
  const benefits = [
    "Unlimited Generated Recipes",
    "Access to all Pro Chef Modes",
    "Daily Meal Plan Tracking",
    "Unlimited Cookbook & Shopping Lists",
  ];

  return (
    <div
      className={`
        relative w-full max-w-xl mx-auto
        rounded-4xl p-6 transition-all duration-200
        border-3 border-black
        bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-baseline gap-2 flex-wrap">
          {haveOldPrice && oldPrice && (
            <span className="text-2xl font-bold text-gray-400 line-through">
              ${oldPrice}
            </span>
          )}
          <span className="text-3xl font-extrabold text-gray-700">
            ${actualPrice}
          </span>
          <span className="text-xl font-semibold text-gray-700">
            USD / {duration}
          </span>
        </div>
        {haveBestValueTag && (
          <div className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap">
            BEST VALUE
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-0.5 bg-gray-100 my-6 w-full" />

      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#6F8B15] flex-shrink-0 mt-0.5" />
            <span className="text-black font-semibold text-sm leading-relaxed">
              {benefit}
            </span>
          </div>
        ))}
      </div>

      {/* Upgrade Button */}
      <button
        onClick={onUpgrade}
        className="w-full mt-6 bg-[#6F8B15] hover:bg-[#5a7011] text-white font-bold py-3 px-6 rounded-4xl transition-colors duration-200"
      >
        Upgrade to Pro
      </button>
    </div>
  );
};

export default DealsCard;
