import kitchenToolsData from "@/public/kitchen_tools.json";

export interface KitchenTool {
  id: string;
  name: string;
  prefixImage: string;
}

// Load all kitchen tools from JSON
export const KITCHEN_TOOLS: KitchenTool[] = (kitchenToolsData as any[]).map((tool) => ({
  id: tool.id,
  name: tool.name,
  prefixImage: tool.prefixImage,
}));

// Get all kitchen tools (for prompts)
export function getAllKitchenTools(): KitchenTool[] {
  return KITCHEN_TOOLS;
}
