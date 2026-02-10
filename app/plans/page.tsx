"use client";

import React, { useState } from "react";
import { Rocket } from "lucide-react";
import DealsCard from "./_components/deals-card";

const PlansPage = () => {
  const handleUpgrade = (planType: "year" | "month") => {
    // TODO: Implement upgrade functionality
    console.log("Upgrading to:", planType);
  };

  return (
    <div className="min-h-screen bg-white pt-8 pb-0 px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header with Rocket Icon */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Rocket className="w-9 h-9 text-gray-700" />
          <h1 className="text-4xl font-black text-green-700 color-[#6F8B15]">
            Free for first 7 days!
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-center font-medium text-xl text-gray-800 mb-12 leading-relaxed spacing-0">
          Unlock the full experience <br />
          and level up your cooking game.
        </p>

        {/* Plan Cards */}
        <div className="space-y-6 mb-8">
          <DealsCard
            haveBestValueTag={true}
            actualPrice={29.99}
            oldPrice={35.88}
            duration="year"
            haveOldPrice={true}
            onUpgrade={() => handleUpgrade("year")}
          />

          <DealsCard
            haveBestValueTag={false}
            actualPrice={2.99}
            duration="month"
            haveOldPrice={false}
            onUpgrade={() => handleUpgrade("month")}
          />
        </div>

        {/* Billing Disclaimer */}
        <p className="text-center text-gray-600 text-sm max-w-2xl mx-auto mb-4 mt-8 leading-relaxed">
          Billing starts at the end of your free trial. You can cancel anytime.
        </p>

        {/* Terms & Conditions Link */}
        <button
          className="block mx-auto text-[#6F8B15] hover:underline font-medium"
          onClick={() => {
            // TODO: Navigate to terms & conditions
            console.log("Navigate to Terms & Conditions");
          }}
        >
          Terms & Conditions
        </button>
      </div>
    </div>
  );
};

export default PlansPage;
