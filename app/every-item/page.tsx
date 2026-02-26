"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "../home/components/navBar/nav-bar";
import { ItemCard, ItemCardData } from "./_components/ItemCard";

const ITEM_CARDS: ItemCardData[] = [
  {
    name: "Shopping List",
    subtitle: "Manage your shopping list",
    href: "/shopping-list",
    image: "/images/shopping_list.png",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    name: "Inventory",
    subtitle: "All of your kitchen inventory",
    href: "/pantry-inventory",
    image: "/images/pantry.png",
    bgColor: "bg-green-50 dark:bg-green-950/30",
  },
  {
    name: "Kitchen Tools",
    subtitle: "Manage your kitchen tools",
    href: "/kitchen-tools",
    image: "/images/pan.png",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    name: "Saved Recipes",
    subtitle: "Manage all your saved recipes",
    href: "/cookbook",
    image: "/images/saved_recipe.png",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
  },
];

const EveryItem = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <div className="w-full max-w-md mx-auto px-5 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Every Items
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          {ITEM_CARDS.map((card) => (
            <ItemCard key={card.name} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EveryItem;
