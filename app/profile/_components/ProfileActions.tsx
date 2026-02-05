import React from "react";
import { LogOut } from "lucide-react";

interface ProfileActionsProps {
  isUpdating: boolean;
  hasChanges: boolean;
  onUpdate: () => void;
  onSignOut: () => void;
}

export const ProfileActions = ({
  isUpdating,
  hasChanges,
  onUpdate,
  onSignOut,
}: ProfileActionsProps) => {
  return (
    <div className="space-y-4 pt-4">
      {/* Update Button */}
      <button
        onClick={onUpdate}
        disabled={!hasChanges || isUpdating}
        className={`w-full py-4 rounded-full font-bold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2
            ${
              !hasChanges || isUpdating
                ? "bg-gray-300 cursor-not-allowed shadow-none"
                : "bg-sky-400 hover:bg-sky-500 shadow-sky-200"
            }
        `}
      >
        {isUpdating ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          "Update Profile"
        )}
      </button>

      {/* Sign Out Button */}
      <button
        onClick={onSignOut}
        className="w-full py-4 rounded-full font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </div>
  );
};
