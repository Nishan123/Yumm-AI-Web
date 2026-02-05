"use client";

import React from "react";
import { Loader2, ChefHat, AlertCircle } from "lucide-react";
import { RecipeGenerationStatus } from "@/hooks/useRecipeGeneration";

interface RecipeGenerationModalProps {
  isOpen: boolean;
  status: RecipeGenerationStatus;
  loadingMessage: string | null;
  errorMessage: string | null;
  onClose?: () => void;
}

export function RecipeGenerationModal({
  isOpen,
  status,
  loadingMessage,
  errorMessage,
  onClose,
}: RecipeGenerationModalProps) {
  if (!isOpen) return null;

  const isLoading = status === "generatingRecipe" || status === "generatingImages" || status === "savingRecipe";
  const isError = status === "error";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          {isLoading && (
            <>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                  <ChefHat className="w-10 h-10 text-orange-500" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-24 h-24 text-orange-500 animate-spin" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {status === "generatingRecipe" && "Generating Recipe"}
                {status === "generatingImages" && "Creating Images"}
                {status === "savingRecipe" && "Saving Recipe"}
              </h3>
              <p className="text-gray-600">
                {loadingMessage || "Please wait while we prepare your recipe..."}
              </p>
              <div className="mt-6 flex space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </>
          )}

          {isError && (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Generation Failed
              </h3>
              <p className="text-gray-600 mb-6">
                {errorMessage || "Something went wrong. Please try again."}
              </p>
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
