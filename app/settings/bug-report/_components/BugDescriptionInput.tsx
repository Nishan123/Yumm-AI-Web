import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const BugDescriptionInput = ({ value, onChange }: Props) => {
  return (
    <div>
      <textarea
        className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c106]/50 min-h-[120px] resize-y"
        placeholder="Describe the issue"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
