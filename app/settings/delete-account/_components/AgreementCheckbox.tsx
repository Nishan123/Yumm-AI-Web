import React from "react";
import { Check } from "lucide-react";

interface AgreementCheckboxProps {
  isAgreed: boolean;
  setIsAgreed: (value: boolean) => void;
}

export const AgreementCheckbox: React.FC<AgreementCheckboxProps> = ({
  isAgreed,
  setIsAgreed,
}) => {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <div
        onClick={() => setIsAgreed(!isAgreed)}
        className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors cursor-pointer
                          ${
                            isAgreed
                              ? "bg-red-500 border-red-500"
                              : "border-gray-300"
                          }`}
      >
        {isAgreed && <Check size={14} className="text-white" />}
      </div>
      <span className="text-sm text-gray-700">
        I agree to the terms and conditions of deleting my account.
      </span>
    </label>
  );
};
