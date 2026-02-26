"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";

const ThemeSettingsPage = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950 pb-20 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            App Theme
          </h1>
        </div>

        <div className="space-y-6">
          <p className="text-gray-500 dark:text-gray-400">
            Choose how you want Yumm AI to look. Select your preferred app
            appearance.
          </p>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xs border border-gray-100 dark:border-zinc-800 overflow-hidden">
            <button
              onClick={() => setTheme("light")}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                theme === "light"
                  ? "bg-gray-50 dark:bg-zinc-800"
                  : "hover:bg-gray-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Light
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  theme === "light"
                    ? "border-[#00c106] bg-[#00c106]"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {theme === "light" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </button>

            <Separator />

            <button
              onClick={() => setTheme("dark")}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                theme === "dark"
                  ? "bg-gray-50 dark:bg-zinc-800"
                  : "hover:bg-gray-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Dark
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  theme === "dark"
                    ? "border-[#00c106] bg-[#00c106]"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {theme === "dark" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </button>

            <Separator />

            <button
              onClick={() => setTheme("system")}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                theme === "system"
                  ? "bg-gray-50 dark:bg-zinc-800"
                  : "hover:bg-gray-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex flex-col items-start">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    System
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Match your system's appearance
                  </span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  theme === "system"
                    ? "border-[#00c106] bg-[#00c106]"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {theme === "system" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettingsPage;
