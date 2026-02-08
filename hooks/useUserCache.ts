import { useState, useEffect } from "react";
import { getCookie, setCookie } from "@/lib/cookies";
import { User } from "@/lib/api/user";

const USER_DATA_KEY = "auth_user";

export const useUserCache = () => {
    const [cachedUser, setCachedUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = getCookie(USER_DATA_KEY);
        if (savedUser) {
            try {
                setCachedUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse cached user data", e);
            }
        }
    }, []);

    const updateCache = (user: User) => {
        setCookie(USER_DATA_KEY, JSON.stringify(user));
        setCachedUser(user);
    };

    return { cachedUser, updateCache };
};
