import { bugReportApi, BugReportRequest } from "../api/bug-report";

export const uploadScreenshotAction = async (file: File) => {
    try {
        const response = await bugReportApi.uploadScreenshot(file);
        return { success: true, data: response.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to upload screenshot",
        };
    }
};

export const createBugReportAction = async (data: BugReportRequest) => {
    try {
        const response = await bugReportApi.createReport(data);
        return { success: true, data: response.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to submit bug report",
        };
    }
};
