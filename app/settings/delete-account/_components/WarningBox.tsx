import React from "react";
import { AlertTriangle } from "lucide-react";

export const WarningBox = () => {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50/60 p-4">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={18} className="text-red-500" />
        <span className="text-sm font-semibold text-red-600">Warning</span>
      </div>
      <p className="text-xs text-red-500/80 leading-relaxed">
        Deleting your account is permanent and cannot be undone. All your data
        will be permanently erased. By proceeding, you will lose access to your
        account immediately.
      </p>
    </div>
  );
};
