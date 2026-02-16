"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { handleVerifyPassword } from "@/lib/actions/auth-action";

interface VerifyIdentityFormProps {
  userId: string;
  onSuccess: () => void;
  currentPassword: string;
  onPasswordChange: (password: string) => void;
}

export const VerifyIdentityForm = ({
  userId,
  onSuccess,
  currentPassword,
  onPasswordChange,
}: VerifyIdentityFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showOldPassword, setShowOldPassword] = useState(false);

  const onVerifyOldPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await handleVerifyPassword(userId, currentPassword);
      if (res.success) {
        onSuccess();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onVerifyOldPassword} className="space-y-6">
      <div className="space-y-2">
        <div className="relative">
          <Input
            id="current-password"
            type={showOldPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Enter current password"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 text-base rounded-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </div>
    </form>
  );
};
