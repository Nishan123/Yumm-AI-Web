import React from "react";
import {
  BugPlay,
  MessagesSquare,
  LayoutTemplate,
  MoreHorizontal,
} from "lucide-react";

export const ISSUE_TYPES = [
  { id: "bug", label: "App Bug", icon: BugPlay },
  { id: "ui", label: "UI Issue", icon: LayoutTemplate },
  { id: "feedback", label: "Feedback", icon: MessagesSquare },
  { id: "others", label: "Others", icon: MoreHorizontal },
];

interface Props {
  selectedIssueType: string | null;
  onSelectIssueType: (id: string) => void;
  otherIssueText: string;
  onOtherIssueTextChange: (text: string) => void;
}

export const BugIssueTypeSelector = ({
  selectedIssueType,
  onSelectIssueType,
  otherIssueText,
  onOtherIssueTextChange,
}: Props) => {
  return (
    <>
      <div>
        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Issue is related to:
        </p>
        <div className="flex flex-wrap gap-3">
          {ISSUE_TYPES.map((type) => {
            const isSelected = selectedIssueType === type.id;
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => onSelectIssueType(type.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  isSelected
                    ? "bg-[#00c106]/10 border-[#00c106] text-[#00c106]"
                    : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedIssueType === "others" && (
        <div>
          <input
            type="text"
            className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00c106]/50"
            placeholder="What is your issue related to"
            value={otherIssueText}
            onChange={(e) => onOtherIssueTextChange(e.target.value)}
          />
        </div>
      )}
    </>
  );
};
