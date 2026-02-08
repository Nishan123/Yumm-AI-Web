import api from "./axios";
import { API } from "./endpoints";
import { User } from "./user";

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

export interface AuthResponse {
    success: boolean;
    data: {
        token: string;
        user: User;
        isNewUser?: boolean;
    };
    message?: string;
}

export const authApi = {
    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(API.AUTH.LOGIN, data);
        return response.data;
    },

    signup: async (data: SignupData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(API.AUTH.REGISTER, data);
        return response.data;
    },

    googleAuth: async (data: GoogleAuthData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(API.AUTH.GOOGLE, data);
        return response.data;
    },

    forgotPassword: async (email: string): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(API.AUTH.FORGOT_PASSWORD, { email });
        return response.data;
    },

    resetPassword: async (token: string, newPassword: string): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(API.AUTH.RESET_PASSWORD(token), { newPassword });
        return response.data;
    },
};

