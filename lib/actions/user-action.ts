// server side processing of user actions
"use server";
import { userApi } from "../api/user";

export interface UpdateUserProfileData {
    fullName: string;
    allergenicIngredients: string[];
}


export const handleUpdateUserProfile = async (
    uid: string,
    data: UpdateUserProfileData,
) => {
    try {
        const result = await userApi.updateUser(uid, {
            fullName: data.fullName,
            allergenicIngredients: data.allergenicIngredients,
        });

        if (result.success) {
            return {
                success: true,
                message: "Profile updated successfully",
                data: result.data,
            };
        }

        return {
            success: false,
            message: result.message || "Failed to update profile",
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to update profile",
        };
    }
};

export const handleDeleteAccountWithPassword = async (uid: string, password: string) => {
    try {
        const result = await userApi.deleteWithPassword(uid, password);
        if (result.success) {
            return {
                success: true,
                message: "Account deleted successfully",
            };
        }
        return {
            success: false,
            message: result.message || "Failed to delete account",
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to delete account",
        };
    }
};

export const handleDeleteAccountWithGoogle = async (uid: string) => {
    try {
        // For Google users on the web, we use the standard delete endpoint (authenticated via session)
        // because we don't have a way to generate a fresh ID token for re-auth on the web client yet.
        const result = await userApi.deleteUser(uid);
        if (result.success) {
            return {
                success: true,
                message: "Account deleted successfully",
            };
        }
        return {
            success: false,
            message: result.message || "Failed to delete account",
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to delete account",
        };
    }
};
