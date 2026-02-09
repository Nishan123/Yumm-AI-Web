"use client";

import React from "react";
import { Recipe, Instruction } from "@/lib/types/recipe.type";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface RecipeInstructionsProps {
  formData: Recipe;
  setFormData: (data: Recipe) => void;
}

export const RecipeInstructions = ({
  formData,
  setFormData,
}: RecipeInstructionsProps) => {
  const addInstruction = () => {
    const newInstruction: Instruction = {
      id: uuidv4(),
      instruction: "",
      isDone: false,
    };
    setFormData({
      ...formData,
      steps: [...formData.steps, newInstruction],
    });
  };

  const removeInstruction = (index: number) => {
    const updated = formData.steps.filter((_, i) => i !== index);
    setFormData({ ...formData, steps: updated });
  };

  const updateInstruction = (index: number, value: string) => {
    const updated = [...formData.steps];
    updated[index] = { ...updated[index], instruction: value };
    setFormData({ ...formData, steps: updated });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
          Instructions
        </h2>
        <button
          onClick={addInstruction}
          className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm transition-all active:scale-95"
        >
          <Plus size={16} />
          Add Step
        </button>
      </div>
      <div className="space-y-3">
        {formData.steps.map((step, index) => (
          <div
            key={step.id}
            className="flex gap-2 items-start p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-1">
              <Label htmlFor={`step-${index}`} className="text-xs">
                Step {index + 1}
              </Label>
              <textarea
                id={`step-${index}`}
                value={step.instruction}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  updateInstruction(index, e.target.value)
                }
                placeholder="Enter instruction..."
                rows={2}
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              onClick={() => removeInstruction(index)}
              className="mt-6 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              title="Remove step"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
