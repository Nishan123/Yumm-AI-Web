"use client";

import { motion } from "framer-motion";
import { ChefHat, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const EmptyState = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6 p-6 rounded-full bg-orange-100 dark:bg-orange-900/20"
      >
        <ChefHat className="w-16 h-16 text-orange-500" />
      </motion.div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
        Your Cookbook is Empty
      </h2>

      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
        Start building your recipe collection! Add recipes from our home feed to
        create your personalized cookbook.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/home")}
        className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
      >
        <Plus size={20} />
        <span>Explore Recipes</span>
      </motion.button>
    </motion.div>
  );
};
