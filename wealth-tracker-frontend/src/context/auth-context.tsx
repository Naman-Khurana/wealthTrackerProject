"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, UserSettings, Subscription, LoginResponse } from "@/type/commman";
import { AUTH_STORAGE_KEY } from "@/constants/app.constants";

export type AuthContextType = {
  user: User | null;
  userSettings: UserSettings | null;
  subscription: Subscription | null;
  isLoggedIn: boolean;
  setAuthData: (data: LoginResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_COOKIE_NAME = "wealth-tracker-auth-userid";

function setAuthCookie(userId: number | null) {
  if (typeof window === "undefined") return;

  if (userId === null) {
    window.document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; sameSite=lax`;
    return;
  }

  window.document.cookie = `${AUTH_COOKIE_NAME}=${userId}; path=/; sameSite=lax`;
}


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!savedAuth) return;

    try {
      const parsed: LoginResponse = JSON.parse(savedAuth);
      setUser(parsed.user ?? null);
      setUserSettings(parsed.userSettings ?? null);
      setSubscription(parsed.subscription ?? null);
      setAuthCookie(parsed.user?.id ?? null);
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      setAuthCookie(null);
    }
  }, []);

  const setAuthData = (data: LoginResponse) => {
    setUser(data.user);
    setUserSettings(data.userSettings);
    setSubscription(data.subscription);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    setAuthCookie(data.user?.id ?? null);
  };

  const logout = () => {
    setUser(null);
    setUserSettings(null);
    setSubscription(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthCookie(null);
  };
  return (
    <AuthContext.Provider value={{
      user,
      userSettings,
      subscription,
      isLoggedIn: !!user,
      setAuthData,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
