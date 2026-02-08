// server side processing of user actions
"use server";
import { userApi, User } from "../api/user";
import { setUserData, getAuthToken } from "../cookie";

export interface UpdateUserProfileData {
    fullName: string;
    allergenicIngredients: string[];
}

export const handleUpdateUserProfile = async (
    uid: string,
    data: UpdateUserProfileData,
    profileImageFile?: FormData
) => {
    try {
        let newProfilePicUrl: string | undefined;

        // 1. Upload Profile Picture if changed
        if (profileImageFile) {
            const response = await userApi.uploadProfilePic(uid, profileImageFile);
            if (response.success && typeof response.data === "string") {
                newProfilePicUrl = response.data;
            }
        }

        // 2. Update User Details
        const updatePayload: Partial<User> = {
            fullName: data.fullName,
            allergenicIngredients: data.allergenicIngredients,
        };

        if (newProfilePicUrl) {
            updatePayload.profilePic = newProfilePicUrl;
        }

        const result = await userApi.updateUser(uid, updatePayload);

        if (result.success) {
            // 3. Update Cookie
            await setUserData(result.data);
            return {
                success: true,
                message: "Profile updated successfully",
                data: result.data
            };
        }

        return {
            success: false,
            message: "Failed to update profile",
        };

    } catch (err: Error | any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to update profile",
        };
    }
};
