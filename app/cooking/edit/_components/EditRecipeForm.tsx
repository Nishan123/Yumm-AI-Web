"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Recipe } from "@/lib/types/recipe.type";
import { updateRecipeAction } from "@/lib/actions/recipe-action";
import { fullUpdateCookbookRecipeAction } from "@/lib/actions/cookbook-action";
import { toast } from "sonner";
import { RecipeBasicInfo } from "./RecipeBasicInfo";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeInstructions } from "./RecipeInstructions";
import { RecipeNutrition } from "./RecipeNutrition";
import { ArrowLeft, Save } from "lucide-react";

interface EditRecipeFormProps {
  recipe: Recipe;
  isOwner: boolean;
  userRecipeId?: string;
}

export const EditRecipeForm = ({
  recipe,
  isOwner,
  userRecipeId,
}: EditRecipeFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Recipe>(recipe);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Determine the correct recipe ID to navigate to
      // UserRecipe objects have originalRecipeId, regular Recipe objects have recipeId
      const navigationRecipeId =
        (formData as any).originalRecipeId || formData.recipeId;

      if (!navigationRecipeId) {
        toast.error("Unable to determine recipe ID for navigation");
        setIsSaving(false);
        return;
      }

      // Determine which update path to use
      if (isOwner && recipe.isPublic) {
        // Owner updating public recipe
        await updateRecipeAction(formData);
        toast.success("Recipe updated successfully!");
      } else if (userRecipeId) {
        // User updating cookbook copy
        await fullUpdateCookbookRecipeAction(userRecipeId, formData);
        toast.success("Your cookbook recipe updated successfully!");
      } else {
        toast.error("Unable to determine update path");
        return;
      }

      // Clear sessionStorage
      sessionStorage.removeItem("editRecipe");
      sessionStorage.removeItem("isOwner");
      sessionStorage.removeItem("userRecipeId");

      // Navigate back to the original recipe using its ID
      router.push(`/cooking?recipeId=${navigationRecipeId}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to save recipe");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => router.push("/home")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Edit Recipe
        </h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          {isSaving ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        <RecipeBasicInfo formData={formData} setFormData={setFormData} />
        <RecipeIngredients formData={formData} setFormData={setFormData} />
        <RecipeInstructions formData={formData} setFormData={setFormData} />
        <RecipeNutrition formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};
