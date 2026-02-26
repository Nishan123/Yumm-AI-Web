import { useState } from "react";
import { uploadScreenshotAction, createBugReportAction } from "@/lib/actions/bug-report-action";

export const useBugReport = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitBugReport = async (
        description: string,
        problemType: string,
        reportedBy: string,
        screenshot?: File
    ) => {
        setIsLoading(true);
        setError(null);
        try {
            let screenshotUrl;

            // Step 1: Upload the screenshot if provided
            if (screenshot) {
                const uploadRes = await uploadScreenshotAction(screenshot);
                if (!uploadRes.success || !uploadRes.data?.imageUrl) {
                    throw new Error(uploadRes.message || "Screenshot upload failed");
                }
                screenshotUrl = uploadRes.data.imageUrl;
            }

            // Step 2: Submit the bug report
            const reportRes = await createBugReportAction({
                reportDescription: description,
                problemType,
                reportedBy,
                screenshotUrl,
            });

            if (!reportRes.success) {
                throw new Error(reportRes.message || "Failed to submit report");
            }

            setIsLoading(false);
            return { success: true, data: reportRes.data };
        } catch (err: any) {
            setIsLoading(false);
            const message = err.message || "An unexpected error occurred.";
            setError(message);
            return { success: false, message };
        }
    };

    return {
        submitBugReport,
        isLoading,
        error,
    };
};
