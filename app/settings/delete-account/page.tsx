"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { DeletionReasons } from "./_components/DeletionReasons";
import { WarningBox } from "./_components/WarningBox";
import { AgreementCheckbox } from "./_components/AgreementCheckbox";
import { PasswordInput } from "./_components/PasswordInput";
import { GoogleAccountCard } from "./_components/GoogleAccountCard";

const DeleteAccountPage = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { isLoading, isEmailPassword, deleteWithPassword, deleteWithGoogle } =
    useDeleteAccount();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) return null;

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason],
    );
  };

  const canSubmit = isAgreed && selectedReasons.length > 0 && !isLoading;

  const handleConfirmDelete = () => {
    if (selectedReasons.length === 0) return;

    if (isEmailPassword) {
      if (!password.trim()) {
        setPasswordError("Enter Password to continue");
        return;
      }
      setPasswordError("");
      deleteWithPassword(password);
    } else {
      // For Google users, show confirmation modal
      setShowConfirmModal(true);
    }
  };

  const handleGoogleDeleteConfirmed = () => {
    setShowConfirmModal(false);
    deleteWithGoogle();
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Delete your account
          </h1>
        </div>

        <div className="space-y-5">
          {/* Auth-specific section */}
          {isEmailPassword ? (
            <PasswordInput
              password={password}
              setPassword={setPassword}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />
          ) : (
            <GoogleAccountCard />
          )}

          {/* Deletion reasons dropdown */}
          <DeletionReasons
            selectedReasons={selectedReasons}
            toggleReason={toggleReason}
          />

          {/* Warning box */}
          <WarningBox />

          {/* Agree checkbox */}
          <AgreementCheckbox isAgreed={isAgreed} setIsAgreed={setIsAgreed} />

          {/* Action buttons */}
          <div className="pt-4 space-y-3">
            <button
              onClick={handleConfirmDelete}
              disabled={!canSubmit}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2
                                ${
                                  canSubmit
                                    ? "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]"
                                    : "bg-red-200 text-red-100 cursor-not-allowed"
                                }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Deleting...
                </div>
              ) : (
                "Confirm Delete"
              )}
            </button>

            {!isLoading && (
              <button
                onClick={() => router.back()}
                className="w-full py-2.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Go Back
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Google account confirmation modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleGoogleDeleteConfirmed}
        title="Delete Account?"
        description="You are about to permanently delete your Google-linked account. This action cannot be undone. All your data, recipes, and saved content will be permanently erased."
        confirmLabel="Delete Account"
        cancelLabel="Cancel"
        variant="destructive"
        isLoading={isLoading}
      />
    </div>
  );
};

export default DeleteAccountPage;
