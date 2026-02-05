import React from "react";

interface ProfileFormProps {
  fullName: string;
  setFullName: (name: string) => void;
  email: string | undefined;
}

export const ProfileForm = ({
  fullName,
  setFullName,
  email,
}: ProfileFormProps) => {
  return (
    <div className="mt-6 w-full text-center">
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full text-center text-xl font-bold bg-transparent border-b border-gray-200 focus:border-orange-500 outline-none pb-1 transition-colors dark:text-gray-100"
        placeholder="Enter full name"
      />
      <p className="text-gray-500 text-sm mt-1">{email}</p>
    </div>
  );
};
