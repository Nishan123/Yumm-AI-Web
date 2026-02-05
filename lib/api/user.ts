import api from "./axios";
import { API } from "./endpoints";

export interface User {
    uid: string;
    fullName: string;
    email: string;
    profilePic: string;
    allergenicIngredients: string[];
    authProvider: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserResponse {
    success: boolean;
    data: User;
}

export interface UploadResponse {
    success: boolean;
    data: string; // The URL of the uploaded image
    message?: string;
}

export const userApi = {
    getUser: async (uid: string): Promise<UserResponse> => {
        const response = await api.get<UserResponse>(API.USERS.GET_ONE(uid));
        return response.data;
    },

    updateUser: async (uid: string, data: Partial<User>): Promise<UserResponse> => {
        const response = await api.put<UserResponse>(`/users/${uid}`, data);
        return response.data;
    },

    uploadProfilePic: async (uid: string, formData: FormData): Promise<UploadResponse> => {
        const response = await api.post<UploadResponse>(`/users/${uid}/profile-pic`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
};
