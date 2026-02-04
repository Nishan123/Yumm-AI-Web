import { Coffee, Sun, Moon, Utensils, Zap, HelpCircle } from "lucide-react";

export const MEAL_OPTIONS = [
    { value: "breakfast", label: "Breakfast", icon: Coffee },
    { value: "lunch", label: "Lunch", icon: Sun },
    { value: "dinner", label: "Dinner", icon: Moon },
    { value: "snack", label: "Snack", icon: Utensils }, // approximate icon
    { value: "dessert", label: "Dessert", icon: Zap }, // approximate icon
    { value: "anything", label: "Anything", icon: HelpCircle },
];

export const EXPERTISE_OPTIONS = [
    { value: "newbie", label: "Newbie" },
    { value: "canCook", label: "I can cook" },
    { value: "expert", label: "Expert" },
];
