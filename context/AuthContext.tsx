"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { getAuthToken, getUserData, clearAuthCookies } from "@/lib/cookie"; // These are server actions, but can be called from client
import {
  handleLogin,
  handleSignup,
  handleGoogleLogin,
  handleLogout,
} from "@/lib/actions/auth-action";
import { User, LoginData, SignupData } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth"; // We might still need api for refreshing user if not via action

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const token = await getAuthToken();
      const userData = await getUserData();

      if (token && userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (data: LoginData) => {
    setLoading(true);
    try {
      const result = await handleLogin(data);
      if (!result.success) {
        throw new Error(result.message);
      }
      await checkAuth(); // Re-fetch state from cookies
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setLoading(true);
    try {
      const result = await handleSignup(data);
      if (!result.success) {
        throw new Error(result.message);
      }
      await checkAuth();
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (idToken: string) => {
    setLoading(true);
    try {
      const result = await handleGoogleLogin(idToken);
      if (!result.success) {
        throw new Error(result.message);
      }
      await checkAuth();
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await handleLogout();
      setIsAuthenticated(false);
      setUser(null);
      router.push("/"); // Or login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshUser = async () => {
    if (!user?.uid) return;
    try {
      // We can use the API directly or creating another action for refreshing
      // For now, let's fetch fresh user and update cookie via action if needed, or just update state
      // But to be consistent with 35C pattern, we usually update user data in cookie on server side
      const response = await authApi.getUser(user.uid);
      if (response.success) {
        setUser(response.data);
        // Note: Ideally we should update the cookie too.
        // We can't update cookie from client directly using server action for cookie *setting* unless we expose a setter action.
        // But handleUpdateProfile in 35C does update cookie.
        // For now, we update local state.
      }
    } catch (error) {
      console.error("Refresh user failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        signup,
        googleLogin,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
