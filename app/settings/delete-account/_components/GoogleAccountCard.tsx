import React from "react";

export const GoogleAccountCard = () => {
  return (
    <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex items-center gap-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/1024px-Google_Favicon_2025.svg.png"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-sm font-medium text-gray-800">
          Logged in via Google account
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        You will be asked to confirm before your account is deleted.
      </p>
    </div>
  );
};
