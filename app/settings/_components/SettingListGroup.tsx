import React from "react";

interface SettingListGroupProps {
  title: string;
  children: React.ReactNode;
}

export const SettingListGroup = ({
  title,
  children,
}: SettingListGroupProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">
        {title}
      </h2>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {children}
      </div>
    </div>
  );
};
