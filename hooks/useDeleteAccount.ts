"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { handleDeleteAccountWithPassword, handleDeleteAccountWithGoogle } from "@/lib/actions/user-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useDeleteAccount = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const deleteWithPassword = async (password: string, reason?: string) => {
        if (!user?.uid) return;
        setIsLoading(true);
        try {
            const result = await handleDeleteAccountWithPassword(user.uid, password, reason);
            if (result.success) {
                toast.success(result.message);
                logout();
                router.push("/login");
            } else {
                toast.error(result.message);
            }
        } catch {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteWithGoogle = async (reason?: string) => {
        if (!user?.uid) return;
        setIsLoading(true);
        try {
            const result = await handleDeleteAccountWithGoogle(user.uid, reason);
            if (result.success) {
                toast.success(result.message);
                logout();
                router.push("/login");
            } else {
                toast.error(result.message);
            }
        } catch {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        isEmailPassword: user?.authProvider === "emailPassword",
        deleteWithPassword,
        deleteWithGoogle,
    };
};
