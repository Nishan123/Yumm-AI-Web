"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authApi, LoginData, SignupData, GoogleAuthData } from "@/lib/api/auth";
import { userApi, User } from "@/lib/api/user";
import { setCookie, getCookie, deleteCookie } from "@/lib/cookies";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data from backend
  const fetchUserFromBackend = useCallback(
    async (uid: string): Promise<User | null> => {
      try {
        const response = await userApi.getUser(uid);
        if (response.success) {
          return response.data;
        }
        return null;
      } catch {
        return null;
      }
    },
    [],
  );

  // Load auth state from cookies on mount and fetch fresh user data
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = getCookie(AUTH_TOKEN_KEY);
      const savedUser = getCookie(USER_DATA_KEY);

      if (savedToken && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser) as User;

          // Validate that uid exists - if not, cookies are corrupted
          if (!parsedUser.uid) {
            console.warn(
              "Invalid user data in cookie - missing uid. Clearing auth state.",
            );
            deleteCookie(AUTH_TOKEN_KEY);
            deleteCookie(USER_DATA_KEY);
            setIsLoading(false);
            return;
          }

          setToken(savedToken);

          // Fetch fresh user data from backend
          const freshUser = await fetchUserFromBackend(parsedUser.uid);
          if (freshUser) {
            setUser(freshUser);
            // Update cookie with fresh data
            setCookie(USER_DATA_KEY, JSON.stringify(freshUser));
          } else {
            // Fallback to cached user if backend fetch fails
            setUser(parsedUser);
          }
        } catch {
          // Invalid data, clear cookies
          deleteCookie(AUTH_TOKEN_KEY);
          deleteCookie(USER_DATA_KEY);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [fetchUserFromBackend]);

  const saveAuthData = useCallback((token: string, user: User) => {
    setCookie(AUTH_TOKEN_KEY, token);
    setCookie(USER_DATA_KEY, JSON.stringify(user));
    setToken(token);
    setUser(user);
  }, []);

  const login = useCallback(
    async (data: LoginData) => {
      const response = await authApi.login(data);
      if (response.success) {
        saveAuthData(response.data.token, response.data.user);
      } else {
        throw new Error("Login failed");
      }
    },
    [saveAuthData],
  );

  const signup = useCallback(
    async (data: SignupData) => {
      const response = await authApi.signup(data);
      if (response.success) {
        saveAuthData(response.data.token, response.data.user);
      } else {
        throw new Error("Signup failed");
      }
    },
    [saveAuthData],
  );

  const googleLogin = useCallback(
    async (idToken: string) => {
      const data: GoogleAuthData = { idToken };
      const response = await authApi.googleAuth(data);
      if (response.success) {
        saveAuthData(response.data.token, response.data.user);
      } else {
        throw new Error("Google login failed");
      }
    },
    [saveAuthData],
  );

  const logout = useCallback(() => {
    deleteCookie(AUTH_TOKEN_KEY);
    deleteCookie(USER_DATA_KEY);
    setToken(null);
    setUser(null);
  }, []);

  // Refresh user data from backend
  const refreshUser = useCallback(async () => {
    if (!user?.uid) return;

    const freshUser = await fetchUserFromBackend(user.uid);
    if (freshUser) {
      setUser(freshUser);
      setCookie(USER_DATA_KEY, JSON.stringify(freshUser));
    }
  }, [user?.uid, fetchUserFromBackend]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    signup,
    googleLogin,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
