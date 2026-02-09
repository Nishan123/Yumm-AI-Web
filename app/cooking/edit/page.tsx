"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Recipe } from "@/lib/types/recipe.type";
import { EditRecipeForm } from "./_components/EditRecipeForm";

interface EditRecipeData {
  recipe: Recipe;
  isOwner: boolean;
  userRecipeId?: string;
}

function EditRecipePageContent() {
  const router = useRouter();
  const [editData, setEditData] = useState<EditRecipeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("editRecipe");
      const isOwnerStr = sessionStorage.getItem("isOwner");
      const userRecipeId = sessionStorage.getItem("userRecipeId");

      if (!storedData) {
        setLoading(false);
        return;
      }

      const recipe = JSON.parse(storedData) as Recipe;
      const isOwner = isOwnerStr === "true";

      setEditData({
        recipe,
        isOwner,
        userRecipeId: userRecipeId || undefined,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error parsing recipe data:", error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!editData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            No Recipe Data Found
          </h1>
          <p className="text-gray-600 mb-6">
            Please navigate from the recipe page to edit.
          </p>
          <button
            onClick={() => router.push("/home")}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <EditRecipeForm
        recipe={editData.recipe}
        isOwner={editData.isOwner}
        userRecipeId={editData.userRecipeId}
      />
    </div>
  );
}

export default function EditRecipePage() {
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
      <EditRecipePageContent />
    </Suspense>
  );
}
