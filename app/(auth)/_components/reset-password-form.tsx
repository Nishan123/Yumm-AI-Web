"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authApi.resetPassword(token, newPassword);
      if (response.success) {
        toast.success("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Invalid or expired token. Please request a new link.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500 mb-6">Reset token is missing or invalid.</p>
        <button
          onClick={() => router.push("/forgot-password")}
          className="text-[#819932] font-semibold hover:underline"
        >
          Request a new link
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        placeholder="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="pt-4">
        <PrimaryBtn
          buttonName="Reset Password"
          type="submit"
          loading={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
