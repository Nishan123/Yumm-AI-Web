"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MoonStar, User, LogIn } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";

const UserProfileWidget = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-black/5 transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent group-hover:ring-[#6F8B15] transition-all relative">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <User size={20} />
              </div>
            )}
          </div>
          <div className="flex flex-col items-start leading-tight">
            <div className="text-sm font-bold text-gray-900 group-hover:text-[#6F8B15] transition-colors">
              {user.fullName || "User"}
            </div>
            <p className="text-xs text-gray-500 font-medium">{user.email}</p>
          </div>
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white hover:bg-[#6F8B15] transition-colors text-sm font-medium shadow-md hover:shadow-lg"
        >
          <LogIn size={18} />
          <span>Sign In</span>
        </button>
      )}

      <div className="h-8 w-px bg-gray-200 mx-2"></div>

      <button className="p-2.5 rounded-full hover:bg-black/5 transition-colors text-gray-600 hover:text-black active:scale-95">
        <MoonStar size={24} />
      </button>
    </div>
  );
};

export default UserProfileWidget;
