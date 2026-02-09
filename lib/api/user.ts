import serverApi from "./axios";
import clientApi from "./api";
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
    message?: string;
}

/**
 * Server-side API functions - use these in server actions
 * These use Next.js server cookies for authentication
 */
export const userApi = {
    getUser: async (uid: string): Promise<UserResponse> => {
        const response = await serverApi.get<UserResponse>(API.USERS.GET_ONE(uid));
        return response.data;
    },

    /**
     * Update user text fields only (fullName, allergenicIngredients, etc.)
     * This endpoint does NOT touch profilePic.
     */
    updateUser: async (uid: string, data: Partial<User>): Promise<UserResponse> => {
        const response = await serverApi.put<UserResponse>(`/users/${uid}`, data);
        return response.data;
    },
};

/**
 * Client-side API functions - use these directly from client components
 * These use document.cookie for authentication
 */
export const userClientApi = {
    getUser: async (uid: string): Promise<UserResponse> => {
        const response = await clientApi.get<UserResponse>(API.USERS.GET_ONE(uid));
        return response.data;
    },

    /**
     * Upload a profile picture file.
     * The backend saves the file to disk AND updates the profilePic field in the DB.
     * Returns the full updated user object.
     *
     * MUST be called from client component (uses document.cookie for auth)
     */
    uploadProfilePic: async (uid: string, formData: FormData): Promise<UserResponse> => {
        const response = await clientApi.post<UserResponse>(`/users/${uid}/profile-pic`, formData);
        return response.data;
    },
};
