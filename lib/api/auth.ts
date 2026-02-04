import api from "./api";

export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData {
    uid: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    allergenicIngredients: string[];
    authProvider: string;
    profilePic: string;
}

export interface GoogleAuthData {
    idToken: string;
}

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

export interface AuthResponse {
    success: boolean;
    data: {
        token: string;
        user: User;
        isNewUser?: boolean;
    };
}

export interface UserResponse {
    success: boolean;
    data: User;
}

export const authApi = {
    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/login", data);
        return response.data;
    },

    signup: async (data: SignupData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/register", data);
        return response.data;
    },

    googleAuth: async (data: GoogleAuthData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/google", data);
        return response.data;
    },

    getUser: async (uid: string): Promise<UserResponse> => {
        const response = await api.get<UserResponse>(`/users/${uid}`);
        return response.data;
    },
};
