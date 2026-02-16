import { ChevronRight, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";

export const ProfilePreviewCard = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div
      onClick={() => router.push("/profile")}
      className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden shrink-0">
        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User size={32} className="text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold text-gray-900 truncate">
          {user?.fullName || "User"}
        </h2>
        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </div>
  );
};
