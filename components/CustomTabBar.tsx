"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CustomTabBarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export const CustomTabBar = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}: CustomTabBarProps) => {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-between rounded-full bg-gray-100/80 p-1 dark:bg-zinc-800",
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "relative z-10 flex-1 rounded-full py-3 px-4 text-sm font-semibold transition-colors duration-200",
              isActive
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
            )}
          >
            {tab}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm dark:bg-zinc-700"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
