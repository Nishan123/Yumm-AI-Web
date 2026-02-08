import { IngredientModel } from "@/data/mockIngredients";
import { KitchenTool } from "@/lib/services/kitchenTools";

// ============ HELPER METHODS ============

function formatIngredients(ingredients: IngredientModel[]): string {
  return ingredients
    .map((i) => {
      const quantityInfo =
        i.quantity || i.unit ? ` | ${i.quantity || ""} ${i.unit || ""}`.trim() : "";
      return `- id="${i.id}" | ingredientName="${i.ingredientName}"${quantityInfo}`;
    })
    .join("\n");
}

function formatKitchenTools(tools: KitchenTool[]): string {
  return tools
    .map((t) => `- id="${t.id}" | toolName="${t.name}" | imageUrl="${t.prefixImage}"`)
    .join("\n");
}

function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    return `${hours} hour${hours > 1 ? "s" : ""} and ${remainingMinutes} minutes`;
  }
  return `${minutes} minutes`;
}

function getRecipeJsonStructure(
  expertiseLevel: string,
  mealType: string,
  servings: number
): string {
  return `
{
  "recipeId": "<generate a unique UUID>",
  "recipeName": "<creative and descriptive recipe name>",
  "ingredients": [
    {
      "id": "<MUST use the exact id from the Available Ingredients list>",
      "ingredientName": "<MUST use the exact ingredientName from the Available Ingredients list>",
      "quantity": "<amount needed for this recipe>",
      "unit": "<measurement unit like 'cups', 'tbsp', 'pieces', etc.>",
      "isReady": false
    }
  ],
  "steps": [
    {
      "id": "<unique step id>",
      "instruction": "<Step 1: Be VERY detailed...dont add any kitchen tools ids or ingredient ids>",
      "isDone": false
    },
    {
       "id": "<unique step id>",
      "instruction": "<Step 2: Continue with same level of detail...dont add any kitchen tools ids or ingredient ids>",
      "isDone": false
    }
  ],
  "initialPreparation": [
    {
       "id": "<unique prep id>",
      "instruction": "<Prep 1: Be VERY detailed...dont add any kitchen tools ids or ingredient ids>",
      "isDone": false
    },
    {
       "id": "<unique prep id>",
      "instruction": "<Prep 2: Example...>",
      "isDone": false
    }
  ],
  "kitchenTools": [
    {
      "toolId": "<MUST use the exact id from tools json>",
      "toolName": "<MUST use the exact toolName from tools json >",
      "imageUrl": "<MUST use the exact imageUrl from tools json>"
    }
  ],
  "experienceLevel": "${expertiseLevel}", // MUST be exactly one of: "newBie", "canCook", "expert"
  "estCookingTime": "<estimated time in format like '30min' or '1h 15min'>",
  "description": "<A compelling 2-3 sentence description of the dish, its flavors, and what makes it special>",
  "mealType": "${mealType}",
  "cuisine": "<cuisine type like 'Italian', 'Asian', 'American', 'Mediterranean', etc.>",
  "calorie": <estimated calories per serving as a number>,
  "images": [],
  "nutrition": {
    "protein": <grams of protein as number>,
    "carbs": <grams of carbs as number>,
    "fat": <grams of fat as number>,
    "fiber": <grams of fiber as number>
  },
  "servings": ${servings}
}`;
}

function getRecipeReminders(): string {
  return `
Remember:
- Steps and Initial Preparation must be arrays of OBJECTS, not strings.
- Each step should be 2-4 sentences with specific details
- Initial preparation should cover ALL mise en place before any heat is applied
- Include at least 5-10 detailed cooking steps
- Include at least 3-5 detailed preparation steps
- Be specific about temperatures, times, and visual/audio cues
- Ensure the recipe is achievable with the given ingredients and time constraint
- "experienceLevel" MUST be one of: "newBie", "canCook", "expert". Do not use "Beginner", "Intermediate", or any other value.`;
}

// ============ PROMPT METHODS ============

export interface PantryChefParams {
  ingredients: IngredientModel[];
  kitchenTools: KitchenTool[];
  mealType: string;
  availableTimeMinutes: number;
  expertise: string;
  allergenicIngredients: string[];
}

export function getPantryChefPrompt({
  ingredients,
  kitchenTools,
  mealType,
  availableTimeMinutes,
  expertise,
  allergenicIngredients,
}: PantryChefParams): string {
  const ingredientsList = formatIngredients(ingredients);
  const kitchenToolsList = formatKitchenTools(kitchenTools);
  const timeString = formatDuration(availableTimeMinutes);
  const expertiseLevel = expertise;

  const allergicString = allergenicIngredients.length === 0 ? "None" : allergenicIngredients.join(", ");

  return `
You are an expert pantry chef and culinary instructor. Based on the available ingredients, create a delicious and practical recipe.

**Available Ingredients:**
\${ingredientsList}

**Available Kitchen Tools:**
\${kitchenToolsList}

**Meal Type:** \${mealType}
**Allergic Ingredients:** \${allergicString}
**Available Cooking Time:** \${timeString}
**Cook's Experience Level:** \${expertiseLevel}

**Instructions:**
1. Create a recipe that ONLY uses the provided ingredients (you may assume basic pantry staples like salt, pepper, oil, and water are available).
2. The recipe must be completable within the available time.
3. Adjust complexity based on the cook's experience level.
4. CRITICAL: STRICTLY EXCLUDE any ingredients found in "**Allergic Ingredients**". Even if such an ingredient is listed in "**Available Ingredients**", you MUST IGNORE it completely. Do not include it in the recipe ingredients, instructions, or preparation.
5. Provide VERY DETAILED cooking steps - explain techniques, temperatures, visual/audio cues, and timing for each step.
6. Provide VERY DETAILED initial preparation steps - explain how to wash, cut, measure, and organize ingredients before cooking begins.
7. CRITICAL: In the "ingredients" array, the "id" and "ingredientName" fields MUST match EXACTLY with values from the "Available Ingredients" list above. Do not modify, abbreviate, or create new names. Only use the exact values provided.
8. CRITICAL: In the "kitchenTools" array, the "toolId", "toolName", and "imageUrl" fields MUST match EXACTLY with values from the "Available Kitchen Tools" list above. Do not include any tools not in this list. Only use tools from the provided list.

**IMPORTANT: Return ONLY a valid JSON object with NO additional text, markdown, or explanation. The response must be parseable JSON.**

Return the recipe in the following JSON structure:
${getRecipeJsonStructure(expertiseLevel, mealType, 1)}

${getRecipeReminders()}
`;
}

export interface MasterChefParams {
  ingredients: IngredientModel[];
  kitchenTools: KitchenTool[];
  mealType: string;
  dietaryRestrictions: string[];
  numberOfServings: number;
  mealPreferences: string;
  availableTimeMinutes: number;
  expertise: string;
  allergenicIngredients: string[];
}

export function getMasterChefPrompt({
  ingredients,
  kitchenTools,
  mealType,
  dietaryRestrictions,
  numberOfServings,
  mealPreferences,
  availableTimeMinutes,
  expertise,
  allergenicIngredients,
}: MasterChefParams): string {
  const ingredientsList = formatIngredients(ingredients);
  const kitchenToolsList = formatKitchenTools(kitchenTools);
  const timeString = formatDuration(availableTimeMinutes);
  const expertiseLevel = expertise;
  const dietaryString = dietaryRestrictions.length === 0 ? "None" : dietaryRestrictions.join(", ");
  const allergicString = allergenicIngredients.length === 0 ? "None" : allergenicIngredients.join(", ");

  return `
You are a world-class master chef and culinary expert. Create an exceptional, restaurant-quality recipe tailored to the user's specific preferences and requirements.

**Available Ingredients:**
\${ingredientsList}

**Available Kitchen Tools:**
\${kitchenToolsList}

**Meal Type:** \${mealType}
**Meal Preferences:** \${mealPreferences || "No specific preferences"}
**Dietary Restrictions:** \${dietaryString}
**Allergic Ingredients:** \${allergicString}
**Number of Servings:** \${numberOfServings}
**Available Cooking Time:** \${timeString}
**Cook's Experience Level:** \${expertiseLevel}

**Instructions:**
1. Create a recipe that uses the provided ingredients as the primary components. You may add common pantry staples (salt, pepper, oil, butter, common spices, garlic, onion, etc.) to enhance the dish.
2. The recipe MUST strictly adhere to ALL dietary restrictions listed above. If a restriction is "Vegetarian", do not include any meat. If "Gluten-Free", avoid all gluten-containing ingredients, etc.
3. CRITICAL: STRICTLY EXCLUDE any ingredients found in "**Allergic Ingredients**". Even if such an ingredient is listed in "**Available Ingredients**", you MUST IGNORE it completely. Do not include it in the recipe ingredients, instructions, or preparation.
4. The recipe must be completable within the available time and scaled for the specified number of servings.
5. Consider the meal preferences when designing the dish - match the cuisine style, flavor profile, or specific requests mentioned.
5. Adjust complexity based on the cook's experience level:
   - For "newbie": Simple techniques, clear explanations, forgiving recipes
   - For "canCook": Moderate techniques, some multi-tasking required
   - For "expert": Advanced techniques, complex flavor layering, precise timing
6. Provide VERY DETAILED cooking steps - explain techniques, temperatures, visual/audio cues, and timing for each step.
7. Provide VERY DETAILED initial preparation steps - explain how to wash, cut, measure, and organize ingredients before cooking begins.
8. CRITICAL: In the "ingredients" array, the "id" and "ingredientName" fields MUST match EXACTLY with values from the "Available Ingredients" list above. Do not modify, abbreviate, or create new names. Only use the exact values provided.
9. CRITICAL: In the "kitchenTools" array, the "toolId", "toolName", and "imageUrl" fields MUST match EXACTLY with values from the "Available Kitchen Tools" list above. Do not include any tools not in this list. Only use tools from the provided list.

**IMPORTANT: Return ONLY a valid JSON object with NO additional text, markdown, or explanation. The response must be parseable JSON.**

Return the recipe in the following JSON structure:
${getRecipeJsonStructure(expertiseLevel, mealType, numberOfServings)}

${getRecipeReminders()}
- STRICTLY follow all dietary restrictions - this is critical for health and safety
- Scale ingredient quantities appropriately for ${numberOfServings} serving(s)
- Consider the meal preferences: "${mealPreferences}" when designing flavors and cuisine style
`;
}

export interface MacroChefParams {
  ingredients: IngredientModel[];
  kitchenTools: KitchenTool[];
  carbs: number;
  proteins: number;
  fats: number;
  fiber: number;
  calories: number;
  mealType: string;
  dietaryRestrictions: string[];
  availableTimeMinutes: number;
  expertise: string;
  allergenicIngredients: string[];
}

export function getMacroChefPrompt({
  ingredients,
  kitchenTools,
  carbs,
  proteins,
  fats,
  fiber,
  calories,
  mealType,
  dietaryRestrictions,
  availableTimeMinutes,
  expertise,
  allergenicIngredients,
}: MacroChefParams): string {
  const ingredientsList = formatIngredients(ingredients);
  const kitchenToolsList = formatKitchenTools(kitchenTools);
  const timeString = formatDuration(availableTimeMinutes);
  const expertiseLevel = expertise;
  const dietaryString = dietaryRestrictions.length === 0 ? "None" : dietaryRestrictions.join(", ");
  const allergicString = allergenicIngredients.length === 0 ? "None" : allergenicIngredients.join(", ");

  // Calculate estimated calories from macros (4 cal/g for carbs & protein, 9 cal/g for fat)
  const estimatedCalories = carbs * 4 + proteins * 4 + fats * 9;

  return `
You are a nutrition-focused chef and sports dietitian. Create a recipe that precisely meets the user's macronutrient targets while being delicious and practical to prepare.

**TARGET MACRONUTRIENTS (per serving):**
- Carbohydrates: \${carbs}g
- Protein: \${proteins}g
- Fats: \${fats}g
- Fiber: \${fiber}g
- Calories: \${calories}kcal
- Estimated Calories: \${estimatedCalories.toFixed(0)} kcal
try ignoring unrealistic macronutrients target value if possible but try your best to come up with matching nutrients if possible.

**Available Ingredients:**
\${ingredientsList}

**Available Kitchen Tools:**
\${kitchenToolsList}

**Meal Type:** \${mealType}
**Dietary Restrictions:** \${dietaryString}
**Allergic Ingredients:** \${allergicString}
**Available Cooking Time:** \${timeString}
**Cook's Experience Level:** \${expertiseLevel}

**Instructions:**
1. Create a recipe that CLOSELY matches the target macronutrients above. The nutrition values in your response should be within ±10% of the targets.
2. Use the provided ingredients as the base, and you may suggest additional ingredients to meet the macro targets.
3. The recipe MUST strictly adhere to ALL dietary restrictions listed above.
4. CRITICAL: STRICTLY EXCLUDE any ingredients found in "**Allergic Ingredients**". Even if such an ingredient is listed in "**Available Ingredients**", you MUST IGNORE it completely. Do not include it in the recipe ingredients, instructions, or preparation.
5. The recipe must be completable within the available time.
6. Prioritize nutrient-dense, whole food ingredients that support the macro goals.
6. Calculate and provide ACCURATE nutrition information based on standard nutritional databases.
7. Adjust complexity based on the cook's experience level:
   - For "newbie": Simple techniques, clear explanations, forgiving recipes
   - For "canCook": Moderate techniques, some multi-tasking required
   - For "expert": Advanced techniques, complex flavor layering, precise timing
8. Provide VERY DETAILED cooking steps - explain techniques, temperatures, visual/audio cues, and timing for each step.
9. Provide VERY DETAILED initial preparation steps - explain how to wash, cut, measure, and organize ingredients before cooking begins.
10. CRITICAL: In the "ingredients" array, the "id" and "ingredientName" fields MUST match EXACTLY with values from the "Available Ingredients" list above. Do not modify, abbreviate, or create new names. Only use the exact values provided.
11. CRITICAL: In the "kitchenTools" array, the "toolId", "toolName", and "imageUrl" fields MUST match EXACTLY with values from the "Available Kitchen Tools" list above. Do not include any tools not in this list. Only use tools from the provided list.

**CRITICAL: The nutrition object in the JSON response MUST closely match these targets:**
- protein: ~${proteins}g
- carbs: ~${carbs}g
- fat: ~${fats}g
- fiber: ~${fiber}g

**IMPORTANT: Return ONLY a valid JSON object with NO additional text, markdown, or explanation. The response must be parseable JSON.**

Return the recipe in the following JSON structure:
${getRecipeJsonStructure(expertiseLevel, mealType, 1)}

${getRecipeReminders()}
- STRICTLY follow all dietary restrictions - this is critical for health and safety
- Ensure the nutrition values closely match the target macronutrients
`;
}
