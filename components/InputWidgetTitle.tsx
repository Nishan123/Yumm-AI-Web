"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputWidgetTitleProps {
  title: string;
  dataText?: string;
  haveActionButton?: boolean;
  actionButtonText?: string;
  onActionTap?: () => void;
  className?: string;
}

export const InputWidgetTitle = ({
  title,
  dataText,
  haveActionButton = false,
  actionButtonText,
  onActionTap,
  className,
}: InputWidgetTitleProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full px-4 py-2",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-gray-800 leading-tight">
          {title}
        </h3>
        {dataText && (
          <span className="text-sm font-medium text-gray-500">{dataText}</span>
        )}
      </div>

      {haveActionButton && actionButtonText && (
        <button
          onClick={onActionTap}
          className="text-orange-500 text-sm font-bold hover:text-orange-600 transition-colors active:scale-95"
        >
          {actionButtonText}
        </button>
      )}
    </div>
  );
};
