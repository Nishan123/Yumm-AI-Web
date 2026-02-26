"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MoonStar, User, LogIn, Settings } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserProfileWidget = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse" />
          <div className="hidden md:flex flex-col items-start gap-1">
            <div className="w-20 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="w-32 h-3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-8 w-px bg-gray-200 dark:bg-zinc-800 mx-2 hidden sm:block"></div>
        <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-1.5 md:pr-4 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 group outline-none">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden ring-2 ring-transparent group-hover:ring-[#6F8B15] transition-all relative">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <User size={20} />
                  </div>
                )}
              </div>
              <div className="hidden md:flex flex-col items-start leading-tight">
                <div className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#6F8B15] transition-colors">
                  {user.fullName || "User"}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {user.email}
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>User Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black text-white hover:bg-[#6F8B15] transition-colors text-sm font-medium shadow-md hover:shadow-lg"
        >
          <LogIn size={18} />
          <span className="hidden sm:inline">Sign In</span>
        </button>
      )}

      <div className="h-8 w-px bg-gray-200 dark:bg-zinc-800 mx-1 sm:mx-2 hidden sm:block"></div>

      <ThemeToggle />
    </div>
  );
};

export default UserProfileWidget;
