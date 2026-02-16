"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ProviderLoginViewProps {
  provider: string;
  onBack: () => void;
}

export const ProviderLoginView = ({
  provider,
  onBack,
}: ProviderLoginViewProps) => {
  return (
    <div className="py-6 text-center space-y-4">
      <p className="text-gray-600">
        You are logged in with{" "}
        <span className="font-semibold capitalize">
          {provider || "a third-party provider"}
        </span>
        . You cannot change your password here.
      </p>
      <Button onClick={onBack} className="w-full">
        Go Back
      </Button>
    </div>
  );
};
