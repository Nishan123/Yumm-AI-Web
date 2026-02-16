import React from "react";
import { Check } from "lucide-react";

interface DeletionReasonsProps {
  selectedReasons: string[];
  toggleReason: (reason: string) => void;
}

const DELETION_REASONS = [
  "Not using app anymore.",
  "I found better alternative.",
  "This app contains too many bugs.",
  "This app didn't have the features or functionality I was looking for.",
  "I'm not satisfied with the app's quality.",
  "This app is difficult to use.",
  "Others",
];

export const DeletionReasons: React.FC<DeletionReasonsProps> = ({
  selectedReasons,
  toggleReason,
}) => {
  const [isReasonsOpen, setIsReasonsOpen] = React.useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsReasonsOpen(!isReasonsOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm transition-colors hover:border-gray-300"
      >
        <span className="text-gray-700">
          {selectedReasons.length > 0
            ? `${selectedReasons.length} reason${selectedReasons.length > 1 ? "s" : ""} selected`
            : "Reasons you decided to leave"}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isReasonsOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isReasonsOpen && (
        <div className="mt-2 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          {DELETION_REASONS.map((reason) => (
            <label
              key={reason}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors
                                  ${
                                    selectedReasons.includes(reason)
                                      ? "bg-red-500 border-red-500"
                                      : "border-gray-300"
                                  }`}
              >
                {selectedReasons.includes(reason) && (
                  <Check size={14} className="text-white" />
                )}
              </div>
              <span className="text-sm text-gray-700">{reason}</span>
              <input
                type="checkbox"
                className="hidden"
                checked={selectedReasons.includes(reason)}
                onChange={() => toggleReason(reason)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
