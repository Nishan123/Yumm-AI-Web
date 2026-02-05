"use server";
import { cookies } from "next/headers";

export const setAuthToken = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "auth_token",
        value: token,
        httpOnly: true,
        path: "/",
        // Add secure flag in production if needed, though cookies() usually handles defaults well
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    })
}

export const getAuthToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    return token;
}

export const setUserData = async (userData: any) => {
    const cookieStore = await cookies();
    // cookie can only store string values
    // convert object to string -> JSON.stringify
    // using "auth_user" to match previous key if possible, but user asked to follow reference project
    // Reference uses "user_data", Target used "auth_user". 
    // I will use "user_data" to match the Reference project's clean structure.
    cookieStore.set({
        name: "user_data",
        value: JSON.stringify(userData),
        httpOnly: true,
        path: "/",
        sameSite: 'lax'
    })
}

export const getUserData = async () => {
    const cookieStore = await cookies();
    const userDataStr = cookieStore.get("user_data")?.value;
    // convert string back to object -> JSON.parse
    if (userDataStr) {
        try {
            return JSON.parse(userDataStr);
        } catch (e) {
            return null;
        }
    }
    return null;
}

export const clearAuthCookies = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
    cookieStore.delete("user_data"); // Clearing the new key
    // Also try to clear the old key just in case to avoid confusion? 
    // No, standardizing.
}
