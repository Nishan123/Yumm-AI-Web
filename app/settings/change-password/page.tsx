"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { ArrowLeft } from "lucide-react";
import { VerifyIdentityForm } from "./_components/VerifyIdentityForm";
import { SetNewPasswordForm } from "./_components/SetNewPasswordForm";
import { ProviderLoginView } from "./_components/ProviderLoginView";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { user, logout, isLoading: isAuthLoading } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login");
    }
  }, [isAuthLoading, user, router]);

  if (isAuthLoading) {
    return null;
  }

  const handlePasswordChangeSuccess = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="flex items-center gap-4 mb-8 justify-start">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Change Password
          </h1>
        </div>

        <div className="bg-white rounded-2xl py-8 px-4 shadow-none border border-gray-200 sm:px-10">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900">
              {step === 1 ? "Verify Identity" : "Set New Password"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {user?.authProvider !== "emailPassword"
                ? "Action unavailable"
                : step === 1
                  ? "Please verify your current password to continue with the password change process."
                  : "Create a strong password that you haven't used before."}
            </p>
          </div>

          {user?.authProvider !== "emailPassword" ? (
            <ProviderLoginView
              provider={user?.authProvider || ""}
              onBack={() => router.back()}
            />
          ) : step === 1 ? (
            <VerifyIdentityForm
              userId={user?.uid || ""}
              currentPassword={oldPassword}
              onPasswordChange={setOldPassword}
              onSuccess={() => setStep(2)}
            />
          ) : (
            <SetNewPasswordForm
              userId={user?.uid || ""}
              oldPassword={oldPassword}
              onSuccess={handlePasswordChangeSuccess}
              onBack={() => setStep(1)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
