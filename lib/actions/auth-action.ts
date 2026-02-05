// server side processing of auth actions
"use server";
import { authApi, LoginData, SignupData, GoogleAuthData } from "../api/auth";
import { setAuthToken, setUserData, clearAuthCookies } from "../cookie";

export const handleLogin = async (data: LoginData) => {
    try {
        const result = await authApi.login(data);
        if (result.success) {
            await setAuthToken(result.data.token);
            await setUserData(result.data.user);
            return {
                success: true,
                message: "Login successful",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Login failed"
        }
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Login failed"
        };
    }
}

export const handleSignup = async (data: SignupData) => {
    try {
        const result = await authApi.signup(data);
        if (result.success) {
            await setAuthToken(result.data.token);
            await setUserData(result.data.user);
            return {
                success: true,
                message: "Signup successful",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Signup failed"
        }
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Signup failed"
        };
    }
}

export const handleGoogleLogin = async (idToken: string) => {
    try {
        const data: GoogleAuthData = { idToken };
        const result = await authApi.googleAuth(data);
        if (result.success) {
            await setAuthToken(result.data.token);
            await setUserData(result.data.user);
            return {
                success: true,
                message: "Google login successful",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Google login failed"
        }
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Google login failed"
        };
    }
}

export const handleLogout = async () => {
    try {
        await clearAuthCookies();
    } catch (error) {
        console.error("Logout failed:", error);
    }
}
