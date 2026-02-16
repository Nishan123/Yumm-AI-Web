"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { handleChangePassword } from "@/lib/actions/auth-action";

interface SetNewPasswordFormProps {
  userId: string;
  onSuccess: () => void;
  onBack: () => void;
  // We need the old password to call the API, although ideally the API should use a token from the verification step.
  // Given existing server actions, we likely need to pass the old password or rethink the flow.
  // Looking at `handleChangePassword(user.uid, oldPassword, newPassword)`, we need `oldPassword`.
  // So we must pass `oldPassword` from the parent or store it.
  oldPassword: string;
}

export const SetNewPasswordForm = ({
  userId,
  onSuccess,
  onBack,
  oldPassword,
}: SetNewPasswordFormProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showNewPassword, setShowNewPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await handleChangePassword(userId, oldPassword, newPassword);
      if (res.success) {
        toast.success("Password changed successfully. Please log in again.");
        onSuccess();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onChangePassword} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <div className="relative">
          <Input
            id="new-password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <div className="relative">
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full"
          />
        </div>
      </div>

      <div className="text-sm text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-100">
        <p className="font-medium">Important Note</p>
        Changing your password will log you out of all sessions. You will need
        to log in again.
      </div>

      <div className="flex justify-end pt-4 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="h-12 px-6 rounded-full"
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 h-12 text-base rounded-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Changing...
            </>
          ) : (
            "Change Password"
          )}
        </Button>
      </div>
    </form>
  );
};
