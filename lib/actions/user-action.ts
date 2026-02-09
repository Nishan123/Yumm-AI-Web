// server side processing of user actions
"use server";
import { userApi } from "../api/user";

export interface UpdateUserProfileData {
    fullName: string;
    allergenicIngredients: string[];
}

/**
 * Update user text fields only (fullName, allergenicIngredients).
 * This does NOT handle profile picture uploads.
 *
 * Profile picture uploads must be done directly from the client component
 * using userApi.uploadProfilePic() — NOT through a server action —
 * because FormData with File objects does not serialize reliably
 * across the Next.js server action boundary.
 */
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
