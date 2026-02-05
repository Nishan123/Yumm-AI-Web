"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import Input from "@/components/ui/input";
import PrimaryBtn from "@/components/ui/primary-btn";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authApi.forgotPassword(email);
      if (response.success) {
        toast.success("Reset link sent! Check your email.");
        setEmail("");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        placeholder="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="pt-4">
        <PrimaryBtn
          buttonName="Send Reset Link"
          type="submit"
          loading={isSubmitting}
        />
      </div>
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#819932] transition-colors"
        >
          &larr; Back to login
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
