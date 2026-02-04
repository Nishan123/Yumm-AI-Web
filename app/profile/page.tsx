"use client";

import { useAuth } from "@/lib/context/auth-context";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold">Profile Page</h1>

      {user && (
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg">
          <div className="w-20 h-20 rounded-full bg-[#D9D9D9] overflow-hidden">
            {user.profilePic && (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold">{user.fullName}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      )}

      <button
        onClick={handleSignOut}
        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
}
