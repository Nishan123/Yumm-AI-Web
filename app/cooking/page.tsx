"use client";

import { Suspense } from "react";
import { RecipeHeader } from "./_components/RecipeHeader";
import { RecipeContent } from "./_components/RecipeContent";
import { RecipeImageCarousel } from "./_components/RecipeImageCarousel";
import { useRouter } from "next/navigation";
import { useCookingRecipe } from "@/hooks/useCookingRecipe";

function CookingPageContent() {
  const router = useRouter();
  const {
    recipe,
    loading,
    error,
    isInCookbook,
    isAddingToCookbook,
    addToCookbook,
    updateProgress,
    user,
  } = useCookingRecipe();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">⚠️ {error || "Recipe not found"}</p>
          <button
            onClick={() => router.push("/home")}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 inline-block"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-white dark:bg-zinc-950 md:flex md:h-screen md:overflow-hidden">
      {/* Mobile Header (Floating) */}
      <div className="absolute left-0 top-0 z-20 w-full md:hidden">
        <RecipeHeader recipe={recipe as Recipe} />
      </div>

      {/* Image Section */}
      <div className="relative h-[30vh] w-full bg-white dark:bg-zinc-950 p-4 md:h-full md:w-1/3 lg:w-4/12 md:p-6 md:pr-0">
        <div className="relative h-full w-full">
          <RecipeImageCarousel
            images={recipe.images}
            recipeName={recipe.recipeName}
          />
          {/* Desktop Header (Overlay on Image) */}
          <div className="hidden absolute left-0 top-0 z-30 w-full md:block pointer-events-none">
            <div className="pointer-events-auto">
              <RecipeHeader recipe={recipe as Recipe} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 w-full bg-white dark:bg-zinc-950 md:w-2/3 md:overflow-y-auto lg:w-8/12">
        <div className="md:p-10 lg:p-12">
          <RecipeContent
            recipe={recipe}
            isInCookbook={isInCookbook}
            onAddToCookbook={addToCookbook}
            isAddingToCookbook={isAddingToCookbook}
            onUpdateProgress={updateProgress}
            currentUser={user}
          />
        </div>
      </div>
    </main>
  );
}

export default function CookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <CookingPageContent />
    </Suspense>
  );
}
