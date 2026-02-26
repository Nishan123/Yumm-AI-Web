"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";
import { useBugReport } from "@/hooks/use-bug-report";

import { BugDescriptionInput } from "./_components/BugDescriptionInput";
import { BugScreenshotPicker } from "./_components/BugScreenshotPicker";
import {
  BugIssueTypeSelector,
  ISSUE_TYPES,
} from "./_components/BugIssueTypeSelector";

const BugReportPage = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { submitBugReport, isLoading: isSubmitting } = useBugReport();

  const [description, setDescription] = useState("");
  const [selectedIssueType, setSelectedIssueType] = useState<string | null>(
    null,
  );
  const [otherIssueText, setOtherIssueText] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScreenshot(null);
    setScreenshotPreview(null);
  };

  const handleReportBug = async () => {
    if (!selectedIssueType) {
      toast.error("Please select an issue type");
      return;
    }

    if (!description.trim()) {
      toast.error("Please describe the issue");
      return;
    }

    let problemType =
      ISSUE_TYPES.find((i) => i.id === selectedIssueType)?.label || "Unknown";
    if (selectedIssueType === "others") {
      if (!otherIssueText.trim()) {
        toast.error("Please specify the issue type");
        return;
      }
      problemType = otherIssueText.trim();
    }

    const reportedBy = user?.email || "Unknown User";

    const res = await submitBugReport(
      description.trim(),
      problemType,
      reportedBy,
      screenshot || undefined,
    );

    if (res.success) {
      toast.success("Bug report sent successfully");
      router.push("/");
    } else {
      toast.error(res.message || "Failed to submit report");
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950 pb-20 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Report Bug
          </h1>
        </div>

        <div className="space-y-6">
          <BugDescriptionInput value={description} onChange={setDescription} />

          <BugScreenshotPicker
            screenshotPreview={screenshotPreview}
            onImagePick={handleImagePick}
            onRemoveImage={handleRemoveImage}
          />

          <BugIssueTypeSelector
            selectedIssueType={selectedIssueType}
            onSelectIssueType={setSelectedIssueType}
            otherIssueText={otherIssueText}
            onOtherIssueTextChange={setOtherIssueText}
          />

          <button
            onClick={handleReportBug}
            disabled={isSubmitting}
            className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold py-4 rounded-full transition-colors flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Send Report"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BugReportPage;
