import api from "./axios";
import { API } from "./endpoints";

export interface BugReportRequest {
    reportDescription: string;
    problemType: string;
    reportedBy: string;
    screenshotUrl?: string;
}

export interface BugReportResponse {
    id: string;
    reportDescription: string;
    problemType: string;
    reportedBy: string;
    screenshotUrl?: string;
    status: string;
    isResolved: boolean;
    createdAt: string;
    updatedAt: string;
}

export const bugReportApi = {
    uploadScreenshot: async (file: File): Promise<{ success: boolean; data: { imageUrl: string } }> => {
        const formData = new FormData();
        formData.append("screenshot", file);

        // Note: Interceptor handles the auth headers automatically
        const response = await api.post(API.BUG_REPORT.UPLOAD_SCREENSHOT, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    },

    createReport: async (data: BugReportRequest): Promise<{ success: boolean; data: BugReportResponse }> => {
        const response = await api.post(API.BUG_REPORT.CREATE, data);
        return response.data;
    },
};
