import { ChefCard } from "@/components/ChefCard";
import { ConstantsString } from "@/data/constants";
import { ChefHat, Sparkles, UtensilsCrossed } from "lucide-react";

const Chef = () => {
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] relative overflow-hidden selection:bg-orange-100 selection:text-orange-900">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        {/* Left Section: Header & Intro */}
        <div className="flex-1 text-center lg:text-left space-y-6 z-10 w-full max-w-lg lg:max-w-none">
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-medium mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Cooking</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
            Who's cooking <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              today?
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Select your culinary companion. Each chef brings a unique specialty
            to your kitchen, from pantry improvisations to macro-perfect meal
            plans.
          </p>
        </div>

        {/* Right Section: Chef Cards */}
        <div className="flex-1 w-full max-w-md lg:max-w-lg z-10">
          <div className="flex flex-col gap-5">
            {/* Pantry Chef */}
            <ChefCard
              title="Pantry Chef"
              description="Turn your available ingredients into delicious meals instantly."
              backgroundImage={ConstantsString.pantryChefBackground}
              suffixImage={ConstantsString.pantryChefSuffix}
              isSuffixCropped
              isLocked={false}
              href="/pantry-chef"
            />

            {/* Master Chef */}
            <ChefCard
              title="Master Chef"
              description="Expert-level recipes tailored to your cravings and preferences."
              backgroundImage={ConstantsString.masterChefBackground}
              suffixImage={ConstantsString.masterChefSuffix}
              isSuffixCropped
              isLocked={false}
              href="/master-chef"
            />

            {/* Macro Chef */}
            <ChefCard
              title="Macro Chef"
              description="Hit your nutrition goals with precise, macro-balanced meal planning."
              backgroundImage={ConstantsString.macroChefBackground}
              suffixImage={ConstantsString.macroChefSuffix}
              isLocked={false}
              href="/macro-chef"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chef;
